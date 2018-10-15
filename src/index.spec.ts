import { Inquirer } from 'inquirer';

import { prompter } from '.';
import { CommitCallback } from './types';

import * as FIXTURE from './__fixtures__/commitAnswers';

describe('#prompter', () => {
  describe('with affected issues', () => {
    let commitizenMock: Inquirer;
    let doneMock: CommitCallback;

    beforeAll(() => {
      commitizenMock = ({
        prompt: jest.fn(() => {
          return Promise.resolve(FIXTURE);
        }),
      } as unknown) as Inquirer;
      doneMock = jest.fn();
    });

    it(`calls uses Commitizen's prompter and calls the callback on completion`, async () => {
      await prompter(commitizenMock, doneMock);
      expect(commitizenMock.prompt).toHaveBeenCalledTimes(1);
      expect(doneMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('with no affected issues', () => {
    let commitizenMock: Inquirer;
    let doneMock: CommitCallback;

    beforeAll(() => {
      commitizenMock = ({
        prompt: jest.fn(() => {
          return Promise.resolve({
            ...FIXTURE,
            isIssueAffected: false,
          });
        }),
      } as unknown) as Inquirer;
      doneMock = jest.fn();
    });

    it(`calls uses Commitizen's prompter and calls the callback on completion`, async () => {
      await prompter(commitizenMock, doneMock);
      expect(commitizenMock.prompt).toHaveBeenCalledTimes(1);
      expect(doneMock).toHaveBeenCalledTimes(1);
    });
  });
});
