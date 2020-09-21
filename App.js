import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { PaymentModule } from "terra-module-js";

let paymentModule = new PaymentModule();

export default function App() {
  const [orderCode, setOrderCode] = useState("");
  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    // paymentModule
    paymentModule
      .initPaymentGateway(
        "PVSDK1",
        "PE1118CC50322",
        "RETAIL",
        "354deb9bf68088199d8818f71c01951f",
        "https://payment.stage.tekoapis.net/"
      )
      .then((result) => {
        if (result.status_code === 200) {
          paymentModule.addCashMethod("1", "2", "VNPAY").then((result) => {
            console.log(result);
          });
          paymentModule.addQrMethod("VNPAY").then((result) => {
            console.log(result);
          });
          paymentModule.addSposMethod("4814", "VNPAY").then((result) => {
            console.log(result);
          });
        } else {
          alert(result.error);
        }
      });
  }, []);

  const startPayment = () => {
    if (orderCode === "" || orderId === "" || amount === 0) {
      return;
    }
    paymentModule
      .startPayment(orderId, orderCode, "", amount, 1000)
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
      <TextInput
        style={{ borderWidth: 1, width: 200, margin: 10 }}
        placeholder="Order code"
        onChangeText={setOrderCode}
      />
      <TextInput
        style={{ borderWidth: 1, width: 200, margin: 10 }}
        placeholder="Order id"
        onChangeText={setOrderId}
      />
      <TextInput
        style={{ borderWidth: 1, width: 200, margin: 10 }}
        placeholder="Amount"
        keyboardType="numeric"
        onChangeText={setAmount}
      />
      <Button title="Click to pay" onPress={startPayment} />
      <Text>
        Chú ý: orderId, orderCode cần cung cấp đúng với merchant có yêu cầu bắt
        buộc phải tạo đơn thành công
      </Text>
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
    padding: 20,
  },
});
