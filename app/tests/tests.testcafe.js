import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
// import { signoutPage } from './signout.page';
import { resultPage } from './results.page';
import { photoInteractPage } from './photoInteract.page';
import { profilePage } from './profile.page';
import { uploadPage } from './upload.page';
import { navBar } from './navbar.component';
import { signupPage } from './signup.page';
import { EditProfile } from './editProfile.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'admin@foo.com', password: 'changeme' };
const testUser = { username: 'isa_sculpts', password: 'password123' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that landing page Renders an image for signed in and not', async (testController) => {
  await landingPage.isDisplayed(testController);
  await landingPage.goToPhotoInteract(testController);
});

test('Test that landing page and the about page', async (testController) => {
  await landingPage.isDisplayed(testController);
  await navBar.gotoAboutPage(testController);
});

test('Test that landing page and search profile without signing in', async (testController) => {
  await landingPage.isDisplayed(testController);
  await navBar.search(testController);
  await resultPage.isDisplayed(testController);
  await resultPage.goToProfile(testController);
  await signinPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await landingPage.isDisplayed(testController);
  await navBar.logout(testController);
  await landingPage.isDisplayed(testController);
});

test('Test that signin landing and photoInteract and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await landingPage.isDisplayed(testController);
  await landingPage.goToPhotoInteract(testController);
  await navBar.logout(testController);
  await landingPage.isDisplayed(testController);
});

test('Test that signin landing and search and profile and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await landingPage.isDisplayed(testController);
  await navBar.search(testController);
  await resultPage.isDisplayed(testController);
  await resultPage.goToProfile(testController);
  await profilePage.isDisplayed(testController);
  await navBar.gotoHomePage(testController);
  await navBar.logout(testController);
  await landingPage.isDisplayed(testController);
});

test('Test editProfile', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await landingPage.isDisplayed(testController);
  await navBar.gotoProfilePage(testController);
  await profilePage.isDisplayed(testController);
  await profilePage.goToEditProfile(testController);
  await EditProfile.isDisplayed(testController);
  await EditProfile.editProfile(testController);
  await navBar.logout(testController);
  await landingPage.isDisplayed(testController);
});

test('Follow & Unfollow test', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await landingPage.isDisplayed(testController);
  await navBar.search(testController);
  await resultPage.isDisplayed(testController);
  await resultPage.goToProfile(testController);
  await profilePage.isDisplayed(testController);
  await profilePage.follow(testController);
  await profilePage.unFollow(testController);
  await navBar.gotoHomePage(testController);
  await navBar.logout(testController);
  await landingPage.isDisplayed(testController);
});

test('PhotoInteract Comment Page test and star and then delete post', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await landingPage.isDisplayed(testController);
  await landingPage.goToPhotoInteract(testController);
  await photoInteractPage.isDisplayed(testController);
  await photoInteractPage.comment(testController);
  await photoInteractPage.deleteComment(testController);
  await photoInteractPage.starPost(testController);
  await photoInteractPage.unStarPost(testController);
  await photoInteractPage.deletePost(testController);
  await photoInteractPage.editPost(testController);
  await navBar.logout(testController);
  await landingPage.isDisplayed(testController);
});

test('upload Image', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await landingPage.isDisplayed(testController);
  await navBar.gotoUploadPage(testController);
  await uploadPage.isDisplayed(testController);
  await uploadPage.postImage(testController);
  await navBar.logout(testController);
});

test('signup', async (testController) => {
  await navBar.gotoSignUpPage(testController);
  await signupPage.signupUser(testController, testUser.username, testUser.password);
});
