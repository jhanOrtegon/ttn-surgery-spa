import Swal from 'sweetalert2';

interface ICustomAlertError {
	message?: string;
	title?: string;
}

interface ICustomAlertWarning {
	message?: string;
}

interface ICustomSuccess {
	message: string;
	title: 'Creado exitosamente' | 'Actualizado exitosamente';
}

export async function customAlertError({
	message = 'Ha ocurrido un error',
	title = 'Intenta de nuevo',
}: ICustomAlertError) {
	return await Swal.fire({
		title: `<span class="text-primary">${title}</span>`,
		text: message,
		icon: 'warning',
		confirmButtonText: 'Aceptar',
		customClass: {
			confirmButton: 'customAlertBtnConfirm',
			cancelButton: 'customAlertBtnCancel',
		},
	});
}

export async function customAlertWarning({ message }: ICustomAlertWarning) {
	return await Swal.fire({
		title: `<span class="text-primary">¿Está seguro?</span>`,
		text: message,
		icon: 'warning',
		confirmButtonText: 'Si, continuar',
		cancelButtonText: 'Cancelar',
		showCancelButton: true,
		customClass: {
			confirmButton: 'customAlertBtnConfirm',
			cancelButton: 'customAlertBtnCancel',
		},
	});
}

export async function customAlertSuccess({ message, title }: ICustomSuccess) {
	return await Swal.fire({
		title: `<span class="text-primary">${title}</span>`,
		text: message,
		icon: 'success',
		confirmButtonText: 'Aceptar',
		customClass: {
			confirmButton: 'customAlertBtnConfirm',
			cancelButton: 'customAlertBtnCancel',
		},
	});
}
