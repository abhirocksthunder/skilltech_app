import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { Input, Button, Icon, InputProps } from "@rneui/themed";
import axios from "axios";
import { API_URL } from "@/constants/Constants";
import { router } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import FullPageLoader from "@/components/FullPageLoader";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch } from "react-redux";
import { loginRequest, loginSuccess } from "@/redux/reducers/authSlice";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const BG_IMAGE = require("@/assets/images/bg_screen3.jpg");

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

type TabSelectorProps = {
  selected: boolean;
};

const TabSelector: React.FunctionComponent<TabSelectorProps> = ({
  selected,
}) => {
  return (
    <View style={styles.selectorContainer}>
      <View style={selected && styles.selected} />
    </View>
  );
};

type LoginScreenState = {};
type LoginScreenProps = {};

SplashScreen.preventAutoHideAsync();

const LoginScreen: React.FunctionComponent<LoginScreenState> = (
  props: LoginScreenProps
) => {
  const {} = props;
  const [isLoading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isEmailValid, setEmailValid] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [isPasswordValid, setPasswordValid] = useState<boolean>(true);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isConfirmPasswordValid, setConfirmPasswordValid] =
    useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const emailInput = useRef<InputProps>(null);
  const passwordInput = useRef<InputProps>(null);
  const confirmationInput = useRef<InputProps>(null);
  const [appIsReady, setAppIsReady] = useState(false);

  const selectCategory = (selectedCategoryIndex: number) => {
    LayoutAnimation.easeInEaseOut();
    setLoading(false);
    setSelectedCategory(selectedCategoryIndex);
  };

  const validateEmail = (testEmail: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(testEmail);
  };

  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [fingerprint, setFingerprint] = useState(false);

  const dispatch = useDispatch();

  const storeData = async (userDetails: any) => {
    await SecureStore.setItemAsync("authToken", userDetails.token);
    await SecureStore.setItemAsync(
      "userData",
      JSON.stringify(userDetails.user)
    );
  };

  const retrieveData = async () => {
    let user;
    const token = await SecureStore.getItemAsync("authToken");
    if (!!token)
      user = JSON.parse((await SecureStore.getItemAsync("userData")) || "");
    return { user, token };
  };

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
      const enroll = await LocalAuthentication.isEnrolledAsync();
      if (enroll) {
        setFingerprint(true);
      }
      authHandler();

      // if (appIsReady) {
      //   await SplashScreen.hideAsync();
      // }
    })();
  }, []);

  const authHandler = async () => {
    try {
      const { token } = await retrieveData();
      if (!!token) {
        const { user } = await retrieveData();
        const biometricAuth = await LocalAuthentication.authenticateAsync({
          promptMessage: "Login to SkillTech",
          disableDeviceFallback: true,
          cancelLabel: "Cancel",
        });
        if (biometricAuth.success) {
          setAppIsReady(true);
          dispatch(loginSuccess({ user, token }));
          await SplashScreen.hideAsync();
          router.replace("/(dashboard)");
        }
      } else {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Tell the application to render
      setAppIsReady(true);
    }
  };

  const login = () => {
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      const isEmailValidFlag = validateEmail(email);
      const isPasswordValidFlag = password.length >= 6;

      LayoutAnimation.easeInEaseOut();
      setLoading(false);
      setEmailValid(isEmailValidFlag);
      setPasswordValid(isPasswordValidFlag);
      if (isEmailValidFlag && isPasswordValidFlag) {
        axios
          .post(`${API_URL}/v1/auth/login`, {
            email: email,
            password: password,
          })
          .then(async (res) => {
            const { user, token } = await res.data;
            dispatch(loginSuccess(res.data));
            if (token) {
              await storeData(res.data);
            }
            authHandler();
          })
          .catch((err) => {
            // setMessage(err.response.data.msg);
            console.log("error======>", err);
          });
      }
    }, 1500);
  };

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={BG_IMAGE}
        style={styles.bgImage}
        resizeMode="stretch"
      >
        <View>
          <View style={styles.titleContainer}>
            <View>
              <Text style={styles.titleText}>Welcome to</Text>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.titleText}>Skill Tech</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button
              disabled={isLoading}
              type="clear"
              activeOpacity={0.7}
              onPress={() => selectCategory(0)}
              containerStyle={{ flex: 1 }}
              titleStyle={[styles.categoryText, styles.selectedCategoryText]}
              title="Login"
            />
          </View>
          {/* <View style={styles.rowSelector}>
              <TabSelector selected={isLoginPage} />
              <TabSelector selected={isSignUpPage} />
            </View> */}
          <View style={styles.formContainer}>
            <Input
              leftIcon={
                <Icon
                  name="envelope-o"
                  type="font-awesome"
                  color="rgba(0, 0, 0, 0.38)"
                  size={25}
                  style={{ backgroundColor: "transparent" }}
                />
              }
              value={email}
              keyboardAppearance="light"
              autoFocus={false}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              inputStyle={{ marginLeft: 10, color: "grey" }}
              placeholder={"Email"}
              containerStyle={{
                borderBottomColor: "rgba(0, 0, 0, 0.38)",
              }}
              //onSubmitEditing={() => passwordInput.current?.focus()}
              onChangeText={(text) => setEmail(text)}
              errorMessage={
                isEmailValid ? "" : "Please enter a valid email address"
              }
            />
            <Input
              leftIcon={
                <Icon
                  name="lock"
                  type="simple-line-icon"
                  color="rgba(0, 0, 0, 0.38)"
                  size={25}
                  style={{ backgroundColor: "transparent" }}
                />
              }
              value={password}
              keyboardAppearance="light"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              returnKeyType={"done"}
              blurOnSubmit={true}
              containerStyle={{
                marginTop: 16,
                borderBottomColor: "rgba(0, 0, 0, 0.38)",
              }}
              inputStyle={{ marginLeft: 10, color: "grey" }}
              placeholder={"Password"}
              onChangeText={(text) => setPassword(text)}
              errorMessage={
                isPasswordValid ? "" : "Please enter at least 8 characters"
              }
            />

            <Button
              buttonStyle={styles.loginButton}
              containerStyle={{ marginTop: 32, flex: 0 }}
              activeOpacity={0.8}
              title={"LOGIN"}
              onPress={login}
              titleStyle={styles.loginTextButton}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
          <View style={styles.helpContainer}>
            <Button
              title={"Forgot Password ?"}
              titleStyle={{ color: "white" }}
              buttonStyle={{ backgroundColor: "transparent" }}
              onPress={() => {}}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
  // }
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
    width: "100%",
    height: SCREEN_HEIGHT,
    alignItems: "center",
    justifyContent: "space-around",
  },
  rowSelector: {
    height: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  selectorContainer: {
    flex: 1,
    alignItems: "center",
  },
  selected: {
    position: "absolute",
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: "white",
    backgroundColor: "white",
  },
  loginTextButton: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "rgba(232, 147, 142, 1)",
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  titleContainer: {
    height: 150,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: "white",
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: "center",
  },
  loginText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  bgImage: {
    flex: 1,
    resizeMode: "contain",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    // fontFamily: "light",
    backgroundColor: "transparent",
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  titleText: {
    color: "white",
    fontSize: 30,
    // fontFamily: "regular",
    textAlign: "center",
  },
  helpContainer: {
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
