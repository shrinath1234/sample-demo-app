import { Locator, Page } from '@playwright/test';

export class TaskBoardPage {
  readonly page: Page;
  readonly taskTitle: Locator;
  readonly taskForm: Locator;
  readonly taskList: Locator;
  readonly remainingCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.taskTitle = page.getByTestId('task-title');
    this.taskForm = page.getByTestId('task-form');
    this.taskList = page.getByTestId('task-list');
    this.remainingCount = page.getByTestId('remaining-count');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async addTask(title: string, category = 'Personal', priority = 'Normal'): Promise<void> {
    await this.taskTitle.fill(title);
    await this.page.getByTestId('task-category').selectOption({ label: category });
    await this.page.getByTestId('task-priority').selectOption({ label: priority });
    await this.taskForm.getByRole('button', { name: 'Add to list' }).click();
  }

  task(title: string): Locator {
    return this.taskList.getByTestId('task-item').filter({ hasText: title });
  }
}