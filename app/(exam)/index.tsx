// ExamScreen.js
import { Button, CheckBox, ScreenWidth, color } from "@rneui/base";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const ExamScreen = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [timeRemaining, setTimeRemaining] = useState("10:00"); // Placeholder timer
  const [remainingQuestions, setRemainingQuestions] = useState(9); // Example count

  const logo = require("@/assets/images/logo.png");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // Simulated data for the question and options
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question:
        "What is the name of the safety sign? భద్రతా చిహ్నం యొక్క పేరు ఏమిటి?",
      options: [
        { id: "A", text: "Warning sign" },
        { id: "B", text: "Mandatory sign తప్పనిసరి సంతకం" },
        { id: "C", text: "Prohibition sign నిషేధ చిహ్నం" },
        { id: "D", text: "Information sign సమాచార చిహ్నం" },
      ],
      correctAnswer: "D",
      submittedAnswer: "",
    },
    {
      id: 2,
      question:
        "Which type of fire extinguisher is used for fire on electrical equipment? ఎలక్ట్రికల్ ఎక్విప్ మెంట్ పై మంటల కొరకు ఎలాంటి రకం అగ్నిమాపక యంత్రం ఉపయోగించబడుతుంది?",
      options: [
        { id: "A", text: "Halon type హాలోన్ రకం" },
        { id: "B", text: "Foam type నురుగు రకం" },
        { id: "C", text: "Gas cartridge type గ్యాస్ కార్ట్రిడ్జ్ రకం" },
        { id: "D", text: "Stored pressure type నిల్వ చేయబడ్డ ప్రజర్ రకం" },
      ],
      correctAnswer: "A",
      submittedAnswer: "",
    },
    {
      id: 3,
      question:
        "What is the cause for cold solder defect in soldering? సోల్డరింగ్ లో కోల్డ్ సోల్డర్ లోపానికి కారణం ఏమిటి?",
      options: [
        { id: "A", text: "Excessive heating అధికంగా వేడి చేయడం" },
        { id: "B", text: "Insufficient heating తగినంత వేడి చేయకపోవడం" },
        {
          id: "C",
          text: "Incorrect use of solder సోల్డర్ ని తప్పుగా ఉపయోగించడం",
        },
        {
          id: "D",
          text: "High wattage soldering iron అధిక వాటేజీ సోల్డరింగ్ ఐరన్",
        },
      ],
      correctAnswer: "B",
      submittedAnswer: "",
    },
    {
      id: 4,
      question:
        "What is the cause for the defect if phase to ground fault on the transmission line? ట్రాన్స్ మిషన్ లైన్ మీద ఫేజ్ టూ గ్రౌండ్ ఫాల్ట్ అయినట్లయితే, లోపానికి కారణం ఏమిటి?",
      options: [
        { id: "A", text: "Components failure కాంపోనెంట్ లు విఫలం కావడం" },
        { id: "B", text: "Insulation failure" },
        { id: "C", text: "Human error" },
        { id: "D", text: "Fuse failure" },
      ],
      correctAnswer: "B",
      submittedAnswer: "",
    },
  ]);
  const [submitted, setSubmitted] = useState(false);
  if (!submitted)
    return (
      <View style={styles.container}>
        {/* Header with Image */}
        <View style={styles.header}>
          <Image
            source={logo} // Replace with your image URL
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.examTitle}>Workshop Tutorial</Text>
        </View>

        {/* Timer */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>Time Remaining: {timeRemaining}</Text>
          <Button
            title="Submit"
            buttonStyle={{ backgroundColor: "rgba(127, 220, 103, 1)" }}
            containerStyle={{
              height: 40,
              width: 100,
              // marginVertical: 10,
            }}
            titleStyle={{
              color: "white",
              // marginHorizontal: 20,
            }}
            onPress={() => {
              const _questions = [...questions];
              const _currrentQuestion = _questions.find(
                (a) => a.id === currentQuestion
              );
              if (_currrentQuestion !== undefined) {
                _currrentQuestion.submittedAnswer =
                  selectedOption.split(",")[1];
                setQuestions(_questions);
              }
              setSubmitted(true);
            }}
          />
        </View>

        {/* Main Content */}
        <ScrollView style={styles.content}>
          {/* {questions.map((question, i) => {
          return ( */}
          {questions.length - currentQuestion >= 0 && (
            <View key={currentQuestion}>
              <Text style={styles.questionText}>
                {currentQuestion + 1}. {questions[currentQuestion]?.question}
              </Text>
              {questions[currentQuestion]?.options.map((option) => (
                <View style={styles.option}>
                  <CheckBox
                    checked={
                      selectedOption === currentQuestion + 1 + "," + option.id
                        ? true
                        : false
                    }
                    onPress={() =>
                      setSelectedOption(currentQuestion + 1 + "," + option.id)
                    }
                  />
                  <Text style={{ flex: 1, flexWrap: "wrap" }}>
                    {option.text}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Footer with Submit Button and Remaining Questions */}
        <View style={styles.footer}>
          <View style={{ flexDirection: "row" }}>
            <Button
              title="Previous"
              loading={false}
              loadingProps={{ size: "small", color: "white" }}
              buttonStyle={{
                backgroundColor: "rgba(111, 202, 186, 1)",
                borderRadius: 5,
              }}
              titleStyle={{ fontWeight: "bold", fontSize: 23 }}
              containerStyle={{
                marginHorizontal: 10,
                height: 50,
                width: 200,
                marginVertical: 10,
              }}
              onPress={() => console.log("aye")}
            />
            <Button
              title="Next"
              loading={false}
              loadingProps={{ size: "small", color: "white" }}
              buttonStyle={{
                backgroundColor: "rgba(111, 202, 186, 1)",
                borderRadius: 5,
              }}
              titleStyle={{ fontWeight: "bold", fontSize: 23 }}
              containerStyle={{
                marginHorizontal: 10,
                height: 50,
                width: 200,
                marginVertical: 10,
              }}
              onPress={() => {
                const _questions = [...questions];
                const _currrentQuestion = _questions.find(
                  (a) => a.id === currentQuestion
                );
                if (_currrentQuestion !== undefined) {
                  _currrentQuestion.submittedAnswer =
                    selectedOption.split(",")[1];
                  setQuestions(_questions);
                }

                setCurrentQuestion(currentQuestion + 1);
              }}
              disabled={questions.length - currentQuestion - 1 === 0}
            />
          </View>

          <Text style={styles.remainingQuestionsText}>
            Remaining Questions: {questions.length - currentQuestion - 1}
          </Text>
        </View>
      </View>
    );
  else {
    return (
      <View style={styles.container}>
        {/* Header with Image */}
        <View style={styles.header}>
          <Image
            source={logo} // Replace with your image URL
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.examTitle}>Workshop Tutorial</Text>
        </View>

        {/* Timer */}

        <ScrollView style={styles.content}>
          {questions.map((question, i) => {
            return (
              <View key={i}>
                <Text style={styles.questionText}>
                  {i + 1}. {question.question}
                </Text>
                {question.options.map((option) => (
                  <View style={styles.option}>
                    <Text
                      style={[
                        { flex: 1, flexWrap: "wrap" },
                        option.id === question.submittedAnswer && {
                          color: "green",
                        },
                      ]}
                    >
                      {option.text}
                    </Text>
                  </View>
                ))}
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    borderRadius: 50,
    // marginBottom: 10,
    resizeMode: "contain",
    width: ScreenWidth / 2,
  },
  examTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#eee",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
  timerText: {
    fontSize: 16,
    color: "red",
  },
  content: {
    flex: 1,
    // justifyContent: "center",
  },
  questionText: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  remainingQuestionsText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default ExamScreen;
