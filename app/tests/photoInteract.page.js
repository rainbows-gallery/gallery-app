import { Selector } from 'testcafe';

class PhotoInteractPage {
  constructor() {
    this.pageId = '#photo-interact';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async comment(testController) {
    await testController.typeText('#comment-input', 'Love the photo');
    await testController.click('#comment-submit');
    await testController.click(Selector('.swal-button').withText('OK'));
  }

  async deleteComment(testController) {
    await testController.click('#delete-comment-0');
  }
}

export const photoInteractPage = new PhotoInteractPage();
