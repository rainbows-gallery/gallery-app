import { Selector } from 'testcafe';

class ProfilePage {
  constructor() {
    this.pageId = '#profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async unFollow(testController) {
    await testController.click(Selector('.btn').withText('Unfollow'));
  }

  async follow(testController) {
    await testController.click(Selector('.btn').withText('Follow'));
  }
}

export const profilePage = new ProfilePage();
