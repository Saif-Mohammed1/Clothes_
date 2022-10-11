import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { USER_ACTION_TYPES } from "./user.types";

import { signInFailed, signInSuccess } from "./user.action";

export function* signInWithEmailAndPassword({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
    // console.log("user sign in failed", error);
  }
}
export function* onEmailSignIn() {
  yield takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    signInWithEmailAndPassword
  );
}

export function* singInWitGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);

    yield call(getSnapshotFromAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onGoogleSinInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, singInWitGoogle);
}
export function* getSnapshotFromAuth(userAuth, additionalInformation) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInformation
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}
export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);

    if (!userAuth) return;
    yield call(getSnapshotFromAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSinInStart),
    call(onEmailSignIn),
  ]);
}
