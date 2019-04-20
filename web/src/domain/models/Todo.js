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


/**
 * @param {Object} change
 * @param {string} change.title
 * @param {string} change.description
 * @param {TodoModel} item
 * @returns {TodoModel}
 */
const update = (change, item) => ({
  ...item,
  ...change,
  lastUpdateDate: formatDate(new Date()),
  createdDate: item.createdDate,
});

export default update;

