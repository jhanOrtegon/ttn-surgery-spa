import * as Yup from 'yup';

import { getSchemeValidate } from '@/utils';

const { fieldStrRequired, msgFieldStrMin, msgFieldStrMax } = getSchemeValidate();

export const schemeCreateNote = Yup.object().shape({
	comment: fieldStrRequired.min(5, msgFieldStrMin).max(100, msgFieldStrMax),
});
