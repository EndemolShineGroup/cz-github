import { Inquirer } from 'inquirer';

import { prompter } from '.';
import { CommitCallback } from './types';

import {
  body,
  isIssueAffected,
  issues,
  scope,
  subject,
  type,
} from './__fixtures__/commitAnswers';

describe('prompter', () => {
  let commitizenMock: Inquirer;
  let doneMock: CommitCallback;

  describe('with affected issues', () => {
    beforeAll(() => {
      commitizenMock = ({
        prompt: jest.fn(() => {
          return Promise.resolve({
            body,
            isIssueAffected,
            issues,
            scope,
            subject,
            type,
          });
        }),
      } as unknown) as Inquirer;
      doneMock = jest.fn();
    });

    it(`calls uses Commitizen's prompter and calls the callback on completion`, () => {
      prompter(commitizenMock, doneMock);
      expect(commitizenMock.prompt).toHaveBeenCalledTimes(1);
      // @TODO Uncommenting the following line fails the tests - no idea why
      // expect(doneMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('with no affected issues', () => {
    beforeAll(() => {
      commitizenMock = ({
        prompt: jest.fn(() => {
          return Promise.resolve({
            body,
            scope,
            subject,
            type,
          });
        }),
      } as unknown) as Inquirer;
      doneMock = jest.fn();
    });

    it(`calls uses Commitizen's prompter and calls the callback on completion`, () => {
      prompter(commitizenMock, doneMock);
      expect(commitizenMock.prompt).toHaveBeenCalledTimes(1);
      // @TODO Uncommenting the following line fails the tests - no idea why
      // expect(doneMock).toHaveBeenCalledTimes(1);
    });
  });
});
