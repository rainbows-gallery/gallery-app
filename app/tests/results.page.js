import { Selector } from 'testcafe';

class ResultPage {
  constructor() {
    this.pageId = '#search-results-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async goToProfile(testController) {
    await testController.click('#profile-0');
  }
}

export const resultPage = new ResultPage();
