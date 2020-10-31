import { subForm as mainInfoSubForm } from '../renderForm/mainInfo/renderMain';

import mainInfo from './mainValidation';

export default function validate(values) {
  return {
    [mainInfoSubForm]: mainInfo(values[mainInfoSubForm] || {}),
  };
}
