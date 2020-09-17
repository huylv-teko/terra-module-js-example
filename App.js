import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { PaymentModule } from "terra-module-js";

export default function App() {
  useEffect(() => {
    this.paymentModule = new PaymentModule();
    this.paymentModule
      .initPaymentGateway(
        "PVSDK1",
        "PE1118CC50322",
        "RETAIL",
        "354deb9bf68088199d8818f71c01951f",
        "https://payment.stage.tekoapis.net/"
      )
      .then((result) => {
        if (result.status_code === 200) {
          this.paymentModule.addCashMethod("1", "2", "VNPAY").then((result) => {
            console.log(result);
          });
          this.paymentModule.addQrMethod("VNPAY").then((result) => {
            console.log(result);
          });
          this.paymentModule.addSposMethod("4814", "VNPAY").then((result) => {
            console.log(result);
          });
        } else {
          alert(result.error);
        }
      });
  }, []);

  const startPayment = () => {
    this.paymentModule
      .startPayment("1", "2", "", 10000, 1000)
      .then((result) => {
        switch (result.status_code) {
          case 200:
            alert("Success " + result.status_code);
            break;
          case 500:
            alert(result.error);
            break;
          default:
            alert(JSON.stringify(result));
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to dsstart working on your app!</Text>
      <Button title="Click to pay" onPress={startPayment} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
