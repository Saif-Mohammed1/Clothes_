import { takeLatest, call, all, put } from "redux-saga/effects";
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  signOutUser,
  createAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import {
  signInFailed,
  signInSuccess,
  signUpSuccess,
  signUpFailed,
  signOutFailed,
  signOutSuccess,
} from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

// signOut

export function* signOut() {
  try {
    yield call(signOutUser);

    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}
export function* signOutSession() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}
// signUp from
export function* signUpSuccessProcessing({ payload: { user, displayName } }) {
  yield call(getSnapshotFromAuth, user, displayName);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signUpSuccessProcessing);
}
export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    // yield call(createUserDocumentFromAuth, user, displayName);
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed(error));
  }
}
export function* signUpFromStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

/// signIn with email

export function* signInWithEmailStart({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onSignInWithEmailStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailStart);
}

/// signIn with google
export function* signInStart() {
  try {
    const { user } = yield call(signInWithGooglePopup);

    yield call(getSnapshotFromAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}
export function* onSignInWithGoogleStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInStart);
}
/// user info
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

export function* checkUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSaga() {
  yield all([
    call(checkUserSession),
    call(onSignInWithGoogleStart),
    call(onSignInWithEmailStart),
    call(signOutSession),
    call(signUpFromStart),
  ]);
}
