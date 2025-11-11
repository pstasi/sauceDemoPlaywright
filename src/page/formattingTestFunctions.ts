import { Page, Locator } from "@playwright/test"

export class FormattingTestFunctions
{
  private readonly page:Page;

  constructor(page:Page)
  {
    this.page = page;
  }

  async checkForBrokenHTML()
  {
    const allTexts = await this.page.locator('body').allInnerTexts();
    const fullText = allTexts.join(' ');

    // Define suspicious patterns to detect
    const suspiciousPatterns = [
      /\b\w+\.\w+\(.*?\)/g,   // function calls like carry.allTheThings()
      /\$\{[^}]+\}/g,         // template literals ${...}
      /\bundefined\b/g,       // literal 'undefined'
      /\bNaN\b/g,             // literal 'NaN'
    ];

    for (const pattern of suspiciousPatterns) {
      const matches = fullText.match(pattern);
      if (matches && matches.length > 0) {
        throw new Error(`❌ Found suspicious text on page: ${matches.join(', ')}`);
      }
    }
  }
}