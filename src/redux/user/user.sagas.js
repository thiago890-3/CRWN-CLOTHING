import { takeLatest, all, put, call } from 'redux-saga/effects'
import UserActionTypes from './user.types'

import { signInSuccess, signInFailure, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from './user.actions'

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils'

function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth)
        const userSnapshot = yield userRef.get()
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (error) {
        yield put(signInFailure(error))
    }
}

function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider)
        yield getSnapshotFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error))
    }
}

function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapshotFromUserAuth(user)
    } catch (error) {
        yield put(signInFailure(error))
    }
}

function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser()
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth)
    } catch (error) {
        yield put(signInFailure(error))
    }
}

function* signOut() {
    try {
        yield auth.signOut()
        yield (put(signOutSuccess()))
    } catch (error) {
        yield (put(signOutFailure(error)))
    }
}

function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password)
        yield createUserProfileDocument(user, { displayName })
        yield put(signUpSuccess())
        yield put(signInSuccess(user))
    } catch (error) {
        yield put(signUpFailure(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart)
    ])
}