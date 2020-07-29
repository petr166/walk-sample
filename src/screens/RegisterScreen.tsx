import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Input, CheckBox, Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import validator from 'validator';

import { Link, ScreenTitle } from '@app/components';
import { TERMS_URL } from '@app/config/urls';
import { colors } from '@app/config/colors';
import { SimpleObject } from '@app/types';
import { dismissKeyboard } from '@app/utils/ui';
import { IUserSignup, signupReq } from '@app/network';
import { StateProvider } from '@app/globalState';
import { theme } from '@app/config/theme';
import { globalStyles } from '@app/config/styles';
import { useHiddenHeader } from '@app/hooks';

const errorMessages = {
  agreed: 'You have to agree to our terms and conditions',
  name: 'Please enter your full name',
  email: 'Please enter a valid email address',
  password: 'Please enter a valid password',
  passwordRepeat: 'Please make sure it matches your password',
};

const demoValues = {
  name: 'Petru B',
  email: 'petru@home.working',
  password: '123456',
  passwordRepeat: '123456',
  agreed: true,
};

export const RegisterScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<SimpleObject>({});
  const [, setAppLoading] = StateProvider.useGlobal('appLoading');
  const [, setCurrentUser] = StateProvider.useGlobal('currentUser');
  const [, setIsLoggedIn] = StateProvider.useGlobal('isLoggedIn');
  const { scrollThreshold, handleScroll } = useHiddenHeader();

  /** validate inputs */
  const checkErrors = () => {
    /** holds error messages */
    const errorsObj: SimpleObject = {};

    if (!agreed) {
      errorsObj.agreed = errorMessages.agreed;
    }

    if (!validator.isLength(name, { min: 2 })) {
      errorsObj.name = errorMessages.name;
    }

    if (!validator.isEmail(email)) {
      errorsObj.email = errorMessages.email;
    }

    if (
      !validator.isLength(password, { min: 4 }) ||
      !validator.isAlphanumeric(password)
    ) {
      errorsObj.password = errorMessages.password;
    }

    // if password entered, it should match repeat password
    if (!errorsObj.password) {
      if (!validator.equals(passwordRepeat, password)) {
        errorsObj.passwordRepeat = errorMessages.passwordRepeat;
      }
    }

    /** wheter to enable signup action */
    const hasErrors = Object.keys(errorsObj).length > 0;

    return { errorsObj, hasErrors };
  };

  /** SUBMIT press handler, do signup request */
  const handleSubmit = async () => {
    const { hasErrors, errorsObj } = checkErrors();

    setErrors(errorsObj);
    await dismissKeyboard();

    if (hasErrors) {
      return;
    }

    const signupData: IUserSignup = {
      name,
      email: email.toLowerCase(),
      password,
    };

    setAppLoading(true);
    try {
      const userRes = await signupReq(signupData);
      setCurrentUser(userRes);
      setIsLoggedIn(true);
    } catch (err) {
      console.log('Register -> handleSubmit -> err', err);
      Alert.alert(
        'There was an error contacting the server. Please try again later'
      );
    } finally {
      setAppLoading(false);
    }
  };

  /** input demo values */
  const handleFillFormPress = () => {
    setName(demoValues.name);
    setEmail(demoValues.email);
    setPassword(demoValues.password);
    setPasswordRepeat(demoValues.passwordRepeat);
    setAgreed(demoValues.agreed);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[globalStyles.scrollViewContainer]}
      keyboardShouldPersistTaps="always"
      onScroll={handleScroll}>
      <ScreenTitle
        h1
        style={[globalStyles.sideMargined]}
        onLayout={({ nativeEvent: { layout } }) => {
          scrollThreshold.current = layout.y + layout.height;
        }}>
        Register
      </ScreenTitle>

      <Button
        style={[globalStyles.sideMargined, styles.demoFillBtn]}
        titleStyle={styles.demoFillBtnTitle}
        title="Fill form (for demo)"
        onPress={handleFillFormPress}
      />

      <View style={styles.formContainer}>
        <Input
          label="Name"
          placeholder="Full Name"
          leftIcon={{ name: 'account' }}
          containerStyle={styles.inputContainer}
          textContentType="name"
          autoCompleteType="name"
          autoCorrect={false}
          autoCapitalize="words"
          value={name}
          onChangeText={(text) => setName(text)}
          errorMessage={errors.name}
        />

        <Input
          label="Email address"
          placeholder="your@email.com"
          leftIcon={{ name: 'email' }}
          containerStyle={styles.inputContainer}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCompleteType="email"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text.trim())}
          errorMessage={errors.email}
        />

        <Input
          label="Password"
          placeholder="Password"
          leftIcon={{ name: 'lock' }}
          containerStyle={styles.inputContainer}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text.trim())}
          errorMessage={errors.password}
        />
        {/* Password format info */}
        <Text style={[globalStyles.sideMargined, styles.passwordInfo]}>
          Password must contain at least 4 alphanumeric characters (for demo).
        </Text>

        <Input
          label="Repeat Password"
          placeholder="Repeat Password"
          leftIcon={{ name: 'lock' }}
          containerStyle={styles.inputContainer}
          secureTextEntry
          value={passwordRepeat}
          onChangeText={(text) => setPasswordRepeat(text.trim())}
          errorMessage={errors.passwordRepeat}
        />

        <CheckBox
          title={
            <Text style={styles.termsText}>
              I agree with the app's{' '}
              <Link to={TERMS_URL}>terms and conditions.</Link>
            </Text>
          }
          containerStyle={styles.checkBoxContainer}
          checked={agreed}
          onPress={() => {
            setAgreed(!agreed);
            dismissKeyboard();
          }}
        />

        {errors.agreed && (
          <Text style={[globalStyles.sideMargined, styles.errorText]}>
            {errors.agreed}
          </Text>
        )}

        <Button
          title="Signup"
          style={[globalStyles.sideMargined, styles.submitBtn]}
          onPress={handleSubmit}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 30,
    paddingHorizontal: theme.sideMargin,
  },
  checkBoxContainer: {
    // Chechbox.containerStyle doesn't support style array, so apply margin manually
    marginLeft: theme.sideMargin,
    marginRight: theme.sideMargin,
    // ----
    marginTop: 30,
  },
  demoFillBtn: { alignSelf: 'flex-start', marginTop: 20 },
  demoFillBtnTitle: { fontSize: 14 },
  formContainer: { marginTop: 10 },
  passwordInfo: { marginTop: 10 },
  termsText: { marginLeft: 10 },
  errorText: {
    color: colors.error,
    marginTop: -10,
    fontSize: 12,
  },
  submitBtn: { marginTop: 30 },
});
