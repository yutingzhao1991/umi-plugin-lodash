import { uniq } from 'umi/lodash';

export default () => {
  return <div>{uniq([1, 2, 2])}</div>;
};
