import { Selector } from 'testcafe';

class EditProfilePage {
  constructor() {
    this.pageId = '#edit-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editProfile(testController) {
    await testController.setFilesToUpload('#upload-input', ['test.png']);
    await testController.typeText('#bio', 'test');
    await testController.click('#edit-Submit');
  }
}

export const EditProfile = new EditProfilePage();
