import { helper } from '@ember/component/helper';

export default helper(function preventDefault([fn]) {
  return (event) => {
    event.preventDefault();
    fn(event);
  };
});
