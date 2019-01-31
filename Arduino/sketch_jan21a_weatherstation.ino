// Docs here: https://github.com/milesburton/Arduino-Temperature-Control-Library/blob/3.7.6/examples/
#include <DallasTemperature.h> // DallasTemperature - For the DS18B20, grants functionality for it
#include <OneWire.h> // OneWire -  For the DS18B20, lets you access 1-wire devices made by Maxim/Dallas
#include <Ethernet.h> // Ethernet - Allows for Ethernet functionality
#include <SPI.h> // SPI - Enables communication with devices using Serial Peripheral Interface
#include <Wire.h> // Wire - This library allows you to communicate with I2C / TWI devices

#define ONE_WIRE_BUS 2 // Data wire is plugged into port 2 on the Arduino
#define BME280_ADDRESS 0x76
unsigned long int hum_raw,temp_raw,pres_raw;
signed long int t_fine;

 uint16_t dig_T1;
 int16_t dig_T2;
 int16_t dig_T3;
 uint16_t dig_P1;
 int16_t dig_P2;
 int16_t dig_P3;
 int16_t dig_P4;
 int16_t dig_P5;
 int16_t dig_P6;
 int16_t dig_P7;
 int16_t dig_P8;
 int16_t dig_P9;
 int8_t  dig_H1;
 int16_t dig_H2;
 int8_t  dig_H3;
 int16_t dig_H4;
 int16_t dig_H5;
 int8_t  dig_H6;
 
// Create OneWire and DallasTemp objects
OneWire oneWire(ONE_WIRE_BUS); // Setup a oneWire instance to communicate with any OneWire devices (not just Maxim/Dallas temperature ICs)
DallasTemperature sensors(&oneWire); // Pass in our reference of the OneWire object

// MAC address and IP Address for this server
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xCD };
IPAddress ip(192, 168, 1, 45);
// Listen on Port 80 of the above IP address
//EthernetServer server(80);
EthernetClient client;

void setup() {
  // Define variables of type unsigned integer 8 bits in length (AKA: A byte)
  uint8_t osrs_t = 1;             //Temperature oversampling x 1
  uint8_t osrs_p = 1;             //Pressure oversampling x 1
  uint8_t osrs_h = 1;             //Humidity oversampling x 1
  uint8_t mode = 3;               //Normal mode
  uint8_t t_sb = 5;               //Tstandby 1000ms
  uint8_t filter = 0;             //Filter off 
  uint8_t spi3w_en = 0;           //3-wire SPI Disable
    
  uint8_t ctrl_meas_reg = (osrs_t << 5) | (osrs_p << 2) | mode;
  uint8_t config_reg    = (t_sb << 5) | (filter << 2) | spi3w_en;
  uint8_t ctrl_hum_reg  = osrs_h;
  
  Serial.begin(9600); // Open serial communications and wait for port to open
  sensors.begin(); // startup the DallasTemp library
  
  Wire.begin(); // Initiate the Wire library and join the I2C bus as a master or slave
  // Write to 3 sensor registers with the provided values
  writeReg(0xF2,ctrl_hum_reg);
  writeReg(0xF4,ctrl_meas_reg);
  writeReg(0xF5,config_reg);
  readTrim(); 
  
  Serial.println("Ethernet WebServer Example");

  // start the Ethernet connection and the server
  Ethernet.begin(mac, ip);

  // Check for Ethernet hardware present
  if (Ethernet.hardwareStatus() == EthernetNoHardware) {
    Serial.println("Ethernet shield was not found.  Sorry, can't run without hardware. :(");
    while (true) {
      delay(1); // do nothing, no point running without Ethernet hardware
    }
  }
  if (Ethernet.linkStatus() == LinkOFF) {
    Serial.println("Ethernet cable is not connected.");
  }
}


void loop() {
  double temp_act = 0.0, press_act = 0.0,hum_act=0.0;
  signed long int temp_cal;
  unsigned long int press_cal,hum_cal;
    
  readData();
  // retrieve sensor data from the DS18B20 external sensor
  sensors.requestTemperatures();
    
  temp_cal = calibration_T(temp_raw);
  press_cal = calibration_P(pres_raw);
  hum_cal = calibration_H(hum_raw);
  temp_act = (double)temp_cal / 100.0;
  press_act = (double)press_cal / 100.0;
  hum_act = (double)hum_cal / 1024.0;
      
  delay(1000);
    
  // listen for incoming clients
  //EthernetClient client = server.available();
  /*
  if (client) {
    Serial.println("new client");
    // an http request ends with a blank line
    bool currentLineIsBlank = true;
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        Serial.write(c);
        // if you've gotten to the end of the line (received a newline
        // character) and the line is blank, the http request has ended,
        // so you can send a reply
        if (c == '\n' && currentLineIsBlank) {
          // send a standard http response header
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: text/html");
          client.println("Connection: close");  // the connection will be closed after completion of the response
          client.println("Refresh: 5");  // refresh the page automatically every 5 sec
          client.println();
          client.println("<!DOCTYPE HTML>");
          client.println("<html>");
          // output the value of each analog input pin
          client.println("INTERNAL TEMP (BME 280): ");
          // TODO: The DallasTemp library has a toFahrenheit function
          // float DallasTemperature::toFahrenheit(float temp_act);
          client.println(toF(temp_act));
          client.println(" Degrees F");
          client.println("<br />");
          client.println("EXTERNAL TEMP (DS18B20): ");
          client.println(toF(sensors.getTempCByIndex(0)));
          client.println("Degrees F");
          client.println("<br />");
          client.println("PRESSURE: ");
          client.println(press_act);
          client.println(" hPa  ");
          client.println("<br />");
          client.println("HUMIDITY: ");
          client.println(hum_act);
          client.println(" %");   
          client.println("<br />");
          client.println("</html>");
          break;
        }
        if (c == '\n') {
          // you're starting a new line
          currentLineIsBlank = true;
        } else if (c != '\r') {
          // you've gotten a character on the current line
          currentLineIsBlank = false;
        }
      }
    }
    // give the web browser time to receive the data
    delay(1);
    // close the connection:
    client.stop();
    Serial.println("client disconnected");
  }
  */
  
  //{ t: 70.6, h: 50, p: 1000 C}
  String data = "{\"t\":\""; 
    data += toF(sensors.getTempCByIndex(0)); 
    data += "\",\"h\":\""; 
    data += hum_act; 
    data += "\",\"p\":\""; 
    data += press_act;
    data += "\"}";  
  
  if (client.connect("karr-weather.herokuapp.com",80)) { 
    client.println("POST application/json HTTP/1.1"); 
    client.println("Host: karr-weather.herokuapp.com"); 
    client.println("content-Type: application/json;charset=utf-8"); 
    client.print("Content-Length: "); 
    client.println(data.length()); 
    client.println(); 
    client.println(data);
  }

  delay(1000); 
  //digitalWrite(TX_Pin,LOW); // Turn off red tx led 
  // stop the connection: 
    if(client.connected()) { 
      client.stop(); // Disconnect from the server 
    } 
  }

double toF(double cel){
  double f = ((cel * 1.8) + 32);
  return f;
}

void readTrim()
{
    uint8_t data[32],i=0;
    Wire.beginTransmission(BME280_ADDRESS);
    Wire.write(0x88);
    Wire.endTransmission();
    Wire.requestFrom(BME280_ADDRESS,24);
    while(Wire.available()){
        data[i] = Wire.read();
        i++;
    }
    
    Wire.beginTransmission(BME280_ADDRESS);
    Wire.write(0xA1);
    Wire.endTransmission();
    Wire.requestFrom(BME280_ADDRESS,1);
    data[i] = Wire.read();
    i++;
    
    Wire.beginTransmission(BME280_ADDRESS);
    Wire.write(0xE1);
    Wire.endTransmission();
    Wire.requestFrom(BME280_ADDRESS,7);
    while(Wire.available()){
        data[i] = Wire.read();
        i++;    
    }
    dig_T1 = (data[1] << 8) | data[0];
    dig_T2 = (data[3] << 8) | data[2];
    dig_T3 = (data[5] << 8) | data[4];
    dig_P1 = (data[7] << 8) | data[6];
    dig_P2 = (data[9] << 8) | data[8];
    dig_P3 = (data[11]<< 8) | data[10];
    dig_P4 = (data[13]<< 8) | data[12];
    dig_P5 = (data[15]<< 8) | data[14];
    dig_P6 = (data[17]<< 8) | data[16];
    dig_P7 = (data[19]<< 8) | data[18];
    dig_P8 = (data[21]<< 8) | data[20];
    dig_P9 = (data[23]<< 8) | data[22];
    dig_H1 = data[24];
    dig_H2 = (data[26]<< 8) | data[25];
    dig_H3 = data[27];
    dig_H4 = (data[28]<< 4) | (0x0F & data[29]);
    dig_H5 = (data[30] << 4) | ((data[29] >> 4) & 0x0F);
    dig_H6 = data[31];   
}

void writeReg(uint8_t reg_address, uint8_t data)
{
    Wire.beginTransmission(BME280_ADDRESS);
    Wire.write(reg_address);
    Wire.write(data);
    Wire.endTransmission();    
}


void readData()
{
    int i = 0;
    uint32_t data[8];
    Wire.beginTransmission(BME280_ADDRESS);
    Wire.write(0xF7);
    Wire.endTransmission();
    Wire.requestFrom(BME280_ADDRESS,8);
    while(Wire.available()){
        data[i] = Wire.read();
        i++;
    }
    pres_raw = (data[0] << 12) | (data[1] << 4) | (data[2] >> 4);
    temp_raw = (data[3] << 12) | (data[4] << 4) | (data[5] >> 4);
    hum_raw  = (data[6] << 8) | data[7];
}

/* 
NOTES:
x >> y means to shift the bits of x by y places to the right (<< to the left).

OR operator: x | y means to compare the bits of x and y, putting a 1 in each bit if either x or y has a 1 in that position.

AND operator: x & y is the same as |, except that the result is 1 if BOTH x and y have a 1.
*/

signed long int calibration_T(signed long int adc_T)
{
    
    signed long int var1, var2, T;
    var1 = ((((adc_T >> 3) - ((signed long int)dig_T1<<1))) * ((signed long int)dig_T2)) >> 11;
    var2 = (((((adc_T >> 4) - ((signed long int)dig_T1)) * ((adc_T>>4) - ((signed long int)dig_T1))) >> 12) * ((signed long int)dig_T3)) >> 14;
    
    t_fine = var1 + var2;
    T = (t_fine * 5 + 128) >> 8;
    return T; 
}

unsigned long int calibration_P(signed long int adc_P)
{
    signed long int var1, var2;
    unsigned long int P;
    var1 = (((signed long int)t_fine)>>1) - (signed long int)64000;
    var2 = (((var1>>2) * (var1>>2)) >> 11) * ((signed long int)dig_P6);
    var2 = var2 + ((var1*((signed long int)dig_P5))<<1);
    var2 = (var2>>2)+(((signed long int)dig_P4)<<16);
    var1 = (((dig_P3 * (((var1>>2)*(var1>>2)) >> 13)) >>3) + ((((signed long int)dig_P2) * var1)>>1))>>18;
    var1 = ((((32768+var1))*((signed long int)dig_P1))>>15);
    if (var1 == 0)
    {
        return 0;
    }    
    P = (((unsigned long int)(((signed long int)1048576)-adc_P)-(var2>>12)))*3125;
    if(P<0x80000000)
    {
       P = (P << 1) / ((unsigned long int) var1);   
    }
    else
    {
        P = (P / (unsigned long int)var1) * 2;    
    }
    var1 = (((signed long int)dig_P9) * ((signed long int)(((P>>3) * (P>>3))>>13)))>>12;
    var2 = (((signed long int)(P>>2)) * ((signed long int)dig_P8))>>13;
    P = (unsigned long int)((signed long int)P + ((var1 + var2 + dig_P7) >> 4));
    return P;
}

unsigned long int calibration_H(signed long int adc_H)
{
    signed long int v_x1;
    
    v_x1 = (t_fine - ((signed long int)76800));
    v_x1 = (((((adc_H << 14) -(((signed long int)dig_H4) << 20) - (((signed long int)dig_H5) * v_x1)) + 
              ((signed long int)16384)) >> 15) * (((((((v_x1 * ((signed long int)dig_H6)) >> 10) * 
              (((v_x1 * ((signed long int)dig_H3)) >> 11) + ((signed long int) 32768))) >> 10) + (( signed long int)2097152)) * 
              ((signed long int) dig_H2) + 8192) >> 14));
   v_x1 = (v_x1 - (((((v_x1 >> 15) * (v_x1 >> 15)) >> 7) * ((signed long int)dig_H1)) >> 4));
   v_x1 = (v_x1 < 0 ? 0 : v_x1);
   v_x1 = (v_x1 > 419430400 ? 419430400 : v_x1);
   return (unsigned long int)(v_x1 >> 12);   
}