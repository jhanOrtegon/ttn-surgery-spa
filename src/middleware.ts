import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { hasData } from './utils';

export function middleware(request: NextRequest) {
	const cookiesDataBiowel = request.cookies.get('data-biowel')?.value ?? '';
	const cookies = hasData(cookiesDataBiowel) ? JSON.parse(cookiesDataBiowel) : undefined;

	const idModule = cookies?.idModule;
	const idUser = cookies?.idUser;
	const idAccount = cookies?.idAccount;
	const idProfile = cookies?.idProfile;
	const token = cookies?.token;

	const onSurgery = request.url.includes('surgery');

	if (
		hasData(idModule) &&
		hasData(idUser) &&
		hasData(idAccount) &&
		hasData(token) &&
		hasData(idProfile)
	) {
		if (!onSurgery) {
			const response = NextResponse.redirect(new URL('/surgery', request.url));
			return response;
		}
	} else {
		const response = NextResponse.redirect(new URL('http://ttntest.biowel.com.co/categoryselect'));
		response.cookies.delete('data-biowel');
		return response;
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/', '/surgery', '/surgery/(.*)'],
	runtime: 'experimental-edge', // for Edge API Routes only
	unstable_allowDynamic: [
		'/node_modules/sweetalert2/dist/sweetalert2.all.js'
	],
};
