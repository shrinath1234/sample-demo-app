import { expect, test } from '@playwright/test';
import { TaskBoardPage } from '../pages/TaskBoardPage';

test.beforeEach(async ({ page }) => {
  await new TaskBoardPage(page).open();
});

test('shows the starter tasks and remaining count', async ({ page }) => {
  const board = new TaskBoardPage(page);

  await expect(page.getByRole('heading', { name: 'Your day, in order.' })).toBeVisible();
  await expect(board.taskList.getByTestId('task-item')).toHaveCount(3);
  await expect(board.remainingCount).toHaveText('2 to do');
});

test('adds a task with a category and priority', async ({ page }) => {
  const board = new TaskBoardPage(page);

  await board.addTask('Prepare the test plan', 'Work', 'High');

  await expect(board.task('Prepare the test plan')).toContainText('Work');
  await expect(board.task('Prepare the test plan')).toContainText('High priority');
  await expect(board.remainingCount).toHaveText('3 to do');
});

test('marks a task complete and filters completed tasks', async ({ page }) => {
  const board = new TaskBoardPage(page);

  await board.task('Send the project update').getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Done' }).click();

  await expect(board.taskList.getByTestId('task-item')).toHaveCount(2);
  await expect(board.task('Send the project update')).toBeVisible();
  await expect(board.remainingCount).toHaveText('1 to do');
});

test('searches tasks by name', async ({ page }) => {
  const board = new TaskBoardPage(page);

  await page.getByTestId('task-search').fill('flowers');

  await expect(board.taskList.getByTestId('task-item')).toHaveCount(1);
  await expect(board.task('Pick up fresh flowers')).toBeVisible();
});

test('deletes a task', async ({ page }) => {
  const board = new TaskBoardPage(page);

  await board.task('Read a few pages').getByRole('button', { name: 'Delete Read a few pages' }).click();

  await expect(board.taskList.getByTestId('task-item')).toHaveCount(2);
  await expect(board.task('Read a few pages')).toHaveCount(0);
});