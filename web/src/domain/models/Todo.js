import uuidv4 from 'uuid/v4';
import formatDate from 'shared/src/date-utils/format';

import { TODO_STATUS } from '../constants';


/**
 * @param {Object} params
 * @param {string} params.title
 * @param {string} params.description
 * @returns {TodoModel}
 */
export const create = ({ title, description }) => ({
  id: uuidv4(),
  title,
  description,
  createdDate: formatDate(new Date()),
  status: TODO_STATUS.OPEN,
  lastUpdatedDate: null,
});

export const update = ({ title, description }, target) => ({
  ...target,
  title,
  description,
  lastUpdatedDate: formatDate(new Date()),
});


export const getId = ({ id }) => id;
