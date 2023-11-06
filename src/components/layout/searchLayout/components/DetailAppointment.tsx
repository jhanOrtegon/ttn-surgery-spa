import { CustomInput, Text } from '@/components/ui';
import { type IAppointment } from '@/types';
import {
	Button,
	Divider,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';

interface IDetailAppointment {
	appointment: IAppointment;
	isOpen: boolean;
	onClose: () => void;
}

export const DetailAppointment = ({ appointment, isOpen, onClose }: IDetailAppointment) => {
	return (
		<Modal scrollBehavior={'inside'} size='full' isOpen={isOpen} onClose={onClose}>
			<ModalContent>
				{onClose => (
					<>
						<ModalHeader className='flex flex-col gap-1 text-center'>
							<Text value='Detalle de la cita' color='primary' font='bold' variant='title' />
							<div className='text-success mb-2'>{`Estado - ${appointment.status || '-'}`}</div>
							<Divider />
						</ModalHeader>
						<ModalBody>
							<Text
								className='text-center'
								font='bold'
								color='secondary'
								variant='bigSubTitle'
								value={`Identificador de la cita no. ${appointment.id}`}
							/>

							<div className='grid grid-cols-[300px_1fr] gap-10 px-8'>
								<div>
									<CustomInput
										className='mb-4'
										type='number'
										label={'Identificación del paciente'}
										disabled
										value={appointment.cluDocument || '-'}
									/>

									<CustomInput
										disabled
										className='mb-4'
										label={'Primer nombre'}
										value={appointment.cluFirstName || '-'}
									/>

									<CustomInput
										disabled
										className='mb-4'
										label={'Primer apellido'}
										value={appointment.cluLastName || '-'}
									/>

									<CustomInput
										disabled
										className='mb-4'
										label={'Fecha de nacimiento'}
										value={appointment.cluBirhDate || '-'}
									/>

									<CustomInput
										disabled
										className='mb-4'
										label={'Whatsapp'}
										value={appointment.cluWhatasapp || '-'}
									/>

									<CustomInput
										disabled
										className='mb-4'
										label={'Correo electrónico'}
										value={appointment.cluEmail || '-'}
									/>
								</div>

								<div>
									<div className='grid grid-cols-2 gap-10'>
										<div className='grid grid-cols-2 gap-8 mt-6'>
											<div>
												<Text
													color='secondary'
													variant='text'
													font='bold'
													value={'Información de la cita'}
												/>

												<Text color='darkGray' variant='text' font='bold' value={'Sede'} />

												<Text color='darkGray' variant='text' font='bold' value={'Médico'} />

												<Text color='darkGray' variant='text' font='bold' value={'Servicio'} />

												<Text color='darkGray' variant='text' font='bold' value={'Fecha'} />

												<Text
													color='darkGray'
													variant='text'
													font='bold'
													value={'No. Historia clínica'}
												/>

												<Text color='darkGray' variant='text' font='bold' value={'Diagnóstico'} />
											</div>

											<div>
												<div>&nbsp;</div>

												<Text
													className='truncate'
													color='darkGray'
													variant='text'
													value={appointment.siteName || '-'}
												/>

												<Text
													className='truncate'
													color='darkGray'
													variant='text'
													value={appointment.fullNameDoctor || '-'}
												/>

												<Text
													className='truncate'
													color='darkGray'
													variant='text'
													value={appointment.serviceName || '-'}
												/>

												<Text
													className='truncate'
													color='darkGray'
													variant='text'
													value={appointment.dateApp || '-'}
												/>

												<Text
													className='truncate'
													color='darkGray'
													variant='text'
													value={String(appointment.clinicalHistoryID || '-')}
												/>

												<Text color='darkGray' variant='text' value={appointment.dxName || '-'} />
											</div>
										</div>

										<div className='grid grid-cols-2 gap-8 mt-6'>
											<div>
												<Text color='secondary' variant='text' font='bold' value={'Aseguradora'} />

												<Text color='darkGray' variant='text' font='bold' value={'Aseguradora'} />

												<Text color='darkGray' variant='text' font='bold' value={'Contrato'} />

												<Text color='darkGray' variant='text' font='bold' value={'Población'} />

												<Text
													color='darkGray'
													variant='text'
													font='bold'
													value={'Grupo de ingreso'}
												/>

												<Text color='darkGray' variant='text' font='bold' value={'Observaciones'} />
											</div>

											<div>
												<div>&nbsp;</div>

												<Text
													className='truncate'
													color='darkGray'
													variant='text'
													value={appointment.ccName || '-'}
												/>

												<Text
													className='truncate'
													color='darkGray'
													variant='text'
													value={appointment.contractName || '-'}
												/>

												<Text
													className='truncate'
													color='darkGray'
													variant='text'
													value={appointment.popName || '-'}
												/>

												<Text
													className='truncate'
													color='darkGray'
													variant='text'
													value={appointment.crtName || '-'}
												/>

												<Text
													className='truncate'
													color='darkGray'
													variant='text'
													value={appointment.appObservations || '-'}
												/>
											</div>
										</div>
									</div>

									<div className='grid grid-cols-2 gap-8 mt-6'>
										<div className='grid grid-cols-2 gap-8'>
											<div>
												<Text color='secondary' variant='text' font='bold' value={'Recaudo'} />

												<Text color='darkGray' variant='text' font='bold' value={'Efectivo'} />

												<Text color='darkGray' variant='text' font='bold' value={'Total débito'} />

												<Text color='darkGray' variant='text' font='bold' value={'Total'} />

												<Text color='darkGray' variant='text' font='bold' value={'Asesor'} />

												<Text color='darkGray' variant='text' font='bold' value={'Fecha'} />
											</div>

											<div>
												<div>&nbsp;</div>

												<Text className='truncate' color='darkGray' variant='text' value={'-'} />

												<Text className='truncate' color='darkGray' variant='text' value={'-'} />

												<Text className='truncate' color='darkGray' variant='text' value={'-'} />

												<Text className='truncate' color='darkGray' variant='text' value={'-'} />

												<Text className='truncate' color='darkGray' variant='text' value={'-'} />

												<Text className='truncate' color='darkGray' variant='text' value={'-'} />
											</div>
										</div>

										<div>&nbsp;</div>
									</div>
								</div>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button color='primary' variant='ghost' onPress={onClose}>
								Cerrar
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
