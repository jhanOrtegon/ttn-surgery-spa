import { useEffect, useState } from 'react';

// utils
import { nanoid } from 'nanoid';

// hooks
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { useAutoAnimate } from '@formkit/auto-animate/react';

// utils
import { hasData, calculateAge, customAlertError } from '@/utils';

// store
import { useDataPersistent } from '@/store';

// icons
import { IconCirclePlus } from '@tabler/icons-react';

// services
import {
	useGetAffiliationTypes,
	useGetBloodTypes,
	useGetCities,
	useGetClientContracts,
	useGetCompanyTypes,
	useGetContractPopulations,
	useGetCopaymentRate,
	useGetDocumentTypes,
	useGetGenders,
	useGetMaritalStatus,
	useGetProvinces,
	useGetValidateInfoWebScrapper,
	useGetVoluntaryCompanyTypes,
	useUpdatePatient,
} from '@/services/';

// Schemas
import { patientScheme } from '@/schemes';

// types
import { type IPatient } from '@/types';

// components
import { Close, CustomInput, CustomSelect, Text } from '@/components/ui';
import { Button } from '@nextui-org/react';
import { type IContract } from '@/services/patients/types';

type JSONObject = Record<string, any>;

interface IPatientEdit {
	patient?: IPatient;
	className?: string;
	onBack: () => void;
}

interface IInitialValues {
	docTypeId: number;
	docType: string;
	document: string;
	firstName: string;
	otherNames: string;
	lastName: string;
	secondSurname: string;
	birthDate: string;
	age: string;
	whatsapp: string;
	gender: string;
	affiliationTypeId: number;
	email: string;
	maritalStatus: string;
	provinceId: number;
	cityId: number;
	homeAddress: string;
	bloodType: string;
	cellphone: string;
	homephone: string;
	mandatoryCorporateClientId: number;
	mandatoryContractId: number;
	mandatoryContractName: string;
	mandatoryPopulationId: number;
	mandatoryPopulation: string;
	mandatoryCrtId: number;
	mandatoryCrtName: string;
	contracts: IContract[];
}

const initialValues: IInitialValues = {
	docTypeId: 0,
	docType: '',
	document: '',
	firstName: '',
	otherNames: '',
	lastName: '',
	secondSurname: '',
	birthDate: '',
	age: '',
	whatsapp: '',
	gender: '',
	affiliationTypeId: 0,
	email: '',
	maritalStatus: '',
	provinceId: 0,
	cityId: 0,
	homeAddress: '',
	bloodType: '',
	cellphone: '',
	homephone: '',
	mandatoryCorporateClientId: 0,
	mandatoryContractId: 0,
	mandatoryContractName: '',
	mandatoryPopulationId: 0,
	mandatoryPopulation: '',
	mandatoryCrtId: 0,
	mandatoryCrtName: '',
	contracts: [],
};

export const PatientEdit = ({ patient, className, onBack }: IPatientEdit) => {
	//= ================================ =//
	//= ========== 🚑 formik ========== =//
	//= ================================ =//

	const voluntaryContracts = patient?.contracts?.filter(contract => contract.isMain === 0) as
		| IContract[]
		| undefined;
	const obligatoryContract = patient?.contracts?.find(contract => contract.isMain === 1);

	const formik = useFormik({
		initialValues: {
			...initialValues,
			...patient,
			contracts: voluntaryContracts,
			mandatoryCorporateClientId: obligatoryContract?.corporateClientId,
			mandatoryContractId: obligatoryContract?.contractId,
			mandatoryContractName: obligatoryContract?.contractName,
			mandatoryPopulationId: obligatoryContract?.populationId,
			mandatoryPopulation: obligatoryContract?.population,
			mandatoryCrtId: obligatoryContract?.crtId,
			mandatoryCrtName: obligatoryContract?.crtName,
		},
		validationSchema: patientScheme,
		onSubmit: values => {
			updatePatient.mutate();
		},
	});

	const { touched, errors, handleChange, handleBlur, handleSubmit, values, setFieldValue } = formik;

	//= ================================ =//
	//= ========== 🚀 states ========== =//
	//= ================================ =//

	const [parent] = useAutoAnimate();

	const { dataBiowel } = useDataPersistent();

	const { idAccount } = dataBiowel;

	const [validateInfoWebScrapperFilters, setValidateInfoWebScrapperFilters] = useState({
		enable: false,
		filters: {
			modality: 'onSite',
			entityType: 'eps',
			eaccount: idAccount,
			entityId: 0,
		},
	});

	const {
		affiliationTypeId,
		age,
		birthDate,
		bloodType,
		cellphone,
		cityId,
		docTypeId,
		docType,
		document,
		email,
		firstName,
		gender,
		homeAddress,
		homephone,
		lastName,
		maritalStatus,
		otherNames,
		provinceId,
		secondSurname,
		whatsapp,
		mandatoryCorporateClientId,
		mandatoryContractName,
		mandatoryCrtName,
		mandatoryPopulation,
		mandatoryContractId,
		mandatoryPopulationId,
		mandatoryCrtId,
		contracts,
	} = values;

	//= ================================ =//
	//= ========== 🤯 hooks ========== =//
	//= ================================ =//

	const { data: genders } = useGetGenders();

	const { data: documentTypes } = useGetDocumentTypes();

	const { data: maritalStatusList } = useGetMaritalStatus();

	const { data: provinces } = useGetProvinces({ entity_account: idAccount });

	const { data: bloodTypes } = useGetBloodTypes();

	const { data: affiliationTypes } = useGetAffiliationTypes({ eaccount: idAccount });

	const { data: voluntaryCompanyTypes } = useGetVoluntaryCompanyTypes();

	const { data: allCompanyTypesPrepaid } = useGetCompanyTypes({
		eaccount: idAccount,
		status: 'enabled',
		contractCompanyType: 'prepaid',
	});

	const { data: allCompanyTypesSpecialAgreement } = useGetCompanyTypes({
		eaccount: idAccount,
		status: 'enabled',
		contractCompanyType: 'special_agreement',
	});

	const { data: allClientContracts } = useGetClientContracts({
		status: 'enabled',
		eaccount: idAccount,
	});

	const { data: companyTypes } = useGetCompanyTypes({
		eaccount: idAccount,
		contractCompanyType: 'eps',
		status: 'enabled',
	});

	const {
		data: validateInfoWebScrapper,
		isError: isErrorValidateInfoWebScrapper,
		errorWS,
	} = useGetValidateInfoWebScrapper(
		validateInfoWebScrapperFilters.filters,
		validateInfoWebScrapperFilters.enable,
	);

	const { data: clientContracts } = useGetClientContracts(
		{
			client: validateInfoWebScrapperFilters.filters.entityId,
			cType: 'eps',
			status: 'enabled',
			eaccount: idAccount,
		},
		hasData(errorWS) && hasData(validateInfoWebScrapperFilters.filters.entityType),
	);

	const { data: contractPopulations } = useGetContractPopulations(
		{
			contract: mandatoryContractId!,
			status: 'enabled',
			eaccount: idAccount,
		},
		hasData(mandatoryContractId),
	);

	const { data: copaymentRate } = useGetCopaymentRate(
		{ eaccount: idAccount, status: 'enabled', corpclientId: mandatoryCorporateClientId },
		hasData(mandatoryPopulationId),
	);

	const insuranceObligatory: IContract = {
		id: nanoid(),
		isMain: 1,
		corporateClientId: mandatoryCorporateClientId,
		contractId: mandatoryContractId,
		populationId: mandatoryPopulationId,
		crtId: mandatoryCrtId,
		wsValidated: hasData(errorWS) ? 0 : 1,
	};

	const updatePatient = useUpdatePatient(
		{
			...values,
			documentType: docTypeId,
			documentNumber: document,
			affiliationType: affiliationTypeId,
			secondName: otherNames,
			firstSurname: lastName,
			phoneNumber: cellphone,
			eaccount: idAccount,
			contracts: contracts?.length ? [...contracts, insuranceObligatory] : [insuranceObligatory],
		},
		() => onBack(),
	);

	const { data: cities } = useGetCities({
		entity_account: idAccount,
		province: provinceId,
	});

	//= ================================ =//
	//= ========== 🤖 Effects ========== =//
	//= ================================ =//

	useEffect(() => {
		if (validateInfoWebScrapper?.results?.affiliate) {
			const info = validateInfoWebScrapper?.results.info;

			void setFieldValue('mandatoryContractId', info?.contractId);
			void setFieldValue('mandatoryContractName', info?.contractDescription);

			void setFieldValue('mandatoryPopulationId', info?.populationId);
			void setFieldValue('mandatoryPopulation', info?.population);

			void setFieldValue('mandatoryCrtId', info?.crtId);
			void setFieldValue('mandatoryCrtName', info?.crtName);
		}

		if (validateInfoWebScrapper?.results?.affiliate === false) {
			clearMandatoryInsurance();
			void customAlertError({ message: validateInfoWebScrapper.message });
		}
	}, [validateInfoWebScrapper]);

	useEffect(() => {
		if (isErrorValidateInfoWebScrapper && !errorWS) {
			clearMandatoryInsurance();
		}
	}, [isErrorValidateInfoWebScrapper]);

	useEffect(() => {
		if (!errors?.birthDate && touched.birthDate) {
			void setFieldValue('age', calculateAge(new Date(birthDate)));
		}

		if (errors?.birthDate && touched.birthDate) {
			void setFieldValue('age', '');
		}
	}, [birthDate, touched.birthDate, errors.birthDate]);

	//= ================================ =//
	//= ========== 😈 actions ========== =//
	//= ================================ =//

	const handleChangeMandatoryCorporateClient = (event: any) => {
		if (event.value === '') {
			clearMandatoryInsurance();
		}

		if (event.value !== '') {
			setValidateInfoWebScrapperFilters(state => ({
				enable: true,
				filters: {
					...state.filters,
					entityId: event.value,
					docType: docType.toLocaleLowerCase().replace('.', ''),
					doc: document,
				},
			}));
		}

		void setFieldValue('mandatoryCorporateClientId', event.value);
	};

	const clearMandatoryInsurance = () => {
		void setFieldValue('mandatoryCorporateClientId', '');

		void setFieldValue('mandatoryContractId', '');
		void setFieldValue('mandatoryContractName', '');

		void setFieldValue('mandatoryPopulationId', '');
		void setFieldValue('mandatoryPopulation', '');

		void setFieldValue('mandatoryCrtId', '');
		void setFieldValue('mandatoryCrtName', '');
	};

	//= ================================ =//
	//= ========== 👻 Component ======= =//
	//= ================================ =//

	return (
		<FormikProvider value={formik}>
			<form className={className} onSubmit={handleSubmit} noValidate>
				<div className='grid gap-x-6 gap-y-4 justify-between grid-cols-2'>
					<CustomSelect
						isRequired
						name='docTypeId'
						label='Tipo de documento'
						errorMessage={touched.docTypeId && errors?.docTypeId}
						isInvalid={hasData(touched.docTypeId && errors?.docTypeId)}
						value={docTypeId}
						onBlur={handleBlur}
						options={documentTypes?.results}
						onChange={(e: any) => {
							void setFieldValue('docTypeId', e.value);
							void setFieldValue('docType', e.prefix);
						}}
					/>

					<CustomInput
						isRequired
						type='number'
						name='document'
						label='Número de documento'
						errorMessage={touched.document && errors?.document}
						isInvalid={hasData(touched.document && errors?.document)}
						value={document}
						onBlur={handleBlur}
						onChange={handleChange}
					/>
					<CustomInput
						isRequired
						name='firstName'
						label='Primer Nombre'
						errorMessage={touched.firstName && errors?.firstName}
						isInvalid={hasData(touched.firstName && errors?.firstName)}
						value={firstName}
						onBlur={handleBlur}
						onChange={handleChange}
					/>
					<CustomInput
						name='otherNames'
						label='Segundo Nombre'
						errorMessage={touched.otherNames && errors?.otherNames}
						isInvalid={hasData(touched.otherNames && errors?.otherNames)}
						value={otherNames}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					<CustomInput
						isRequired
						name='lastName'
						label='Primer Apellido'
						errorMessage={touched.lastName && errors?.lastName}
						isInvalid={hasData(touched.lastName && errors?.lastName)}
						value={lastName}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					<CustomInput
						isRequired
						name='secondSurname'
						label='Segundo Apellido'
						errorMessage={touched.secondSurname && errors?.secondSurname}
						isInvalid={hasData(touched.secondSurname && errors?.secondSurname)}
						value={secondSurname}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					<CustomInput
						isRequired
						type='date'
						name='birthDate'
						label='Fecha de nacimiento'
						errorMessage={touched.birthDate && errors?.birthDate}
						isInvalid={hasData(touched.birthDate && errors?.birthDate)}
						value={birthDate}
						onChange={handleChange}
						onBlur={handleBlur}
					/>

					<CustomInput
						disabled
						isRequired
						type='number'
						name='age'
						label='Edad'
						errorMessage={touched.age && errors?.age}
						isInvalid={hasData(touched.age && errors?.age)}
						value={age}
					/>

					<CustomInput
						isRequired
						type='number'
						name='whatsapp'
						label='WhatsApp'
						errorMessage={touched.whatsapp && errors?.whatsapp}
						isInvalid={hasData(touched.whatsapp && errors?.whatsapp)}
						value={whatsapp}
						onChange={handleChange}
						onBlur={handleBlur}
					/>

					<CustomSelect
						isRequired
						name='gender'
						label='Género'
						errorMessage={touched.gender && errors?.gender}
						isInvalid={hasData(touched.gender && errors?.gender)}
						value={gender}
						onBlur={handleBlur}
						options={genders}
						onChange={(e: any) => {
							void setFieldValue('gender', e.value);
						}}
					/>

					<CustomSelect
						isRequired
						name='affiliationTypeId'
						label='Tipo de afiliado'
						errorMessage={touched.affiliationTypeId && errors?.affiliationTypeId}
						isInvalid={hasData(touched.affiliationTypeId && errors?.affiliationTypeId)}
						value={affiliationTypeId}
						onBlur={handleBlur}
						options={affiliationTypes?.results}
						onChange={(e: any) => {
							void setFieldValue('affiliationTypeId', e.value);
						}}
					/>

					<CustomInput
						isRequired
						type='email'
						name='email'
						label='Correo electrónico'
						errorMessage={touched.email && errors?.email}
						isInvalid={hasData(touched.email && errors?.email)}
						value={email}
						onChange={handleChange}
						onBlur={handleBlur}
					/>

					<CustomSelect
						name='maritalStatus'
						label='Estado civil'
						errorMessage={touched.maritalStatus && errors?.maritalStatus}
						isInvalid={hasData(touched.maritalStatus && errors?.maritalStatus)}
						value={maritalStatus}
						onBlur={handleBlur}
						options={maritalStatusList}
						onChange={(e: any) => {
							void setFieldValue('maritalStatus', e.value);
						}}
					/>
				</div>

				<Text
					value='Información complementaria'
					variant='subTitle'
					color='primary'
					className='mt-4 mb-2'
				/>

				<div className='grid gap-x-6 gap-y-4 justify-between grid-cols-2'>
					<CustomSelect
						isRequired
						name='provinceId'
						label='Departamento'
						errorMessage={touched.provinceId && errors?.provinceId}
						isInvalid={hasData(touched.provinceId && errors?.provinceId)}
						value={provinceId}
						onBlur={handleBlur}
						options={provinces?.data}
						onChange={(e: any) => {
							void setFieldValue('provinceId', e.value);
							void setFieldValue('cityId', '');
						}}
					/>

					<CustomSelect
						isRequired
						isDisabled={!provinceId}
						name='cityId'
						label='Municipio'
						errorMessage={touched.cityId && errors?.cityId}
						isInvalid={hasData(touched.cityId && errors?.cityId)}
						value={cityId}
						onBlur={handleBlur}
						options={cities?.data}
						onChange={(e: any) => {
							void setFieldValue('cityId', e.value);
						}}
					/>

					<CustomInput
						isRequired
						name='homeAddress'
						label='Dirección'
						errorMessage={touched.homeAddress && errors?.homeAddress}
						isInvalid={hasData(touched.homeAddress && errors?.homeAddress)}
						value={homeAddress}
						onChange={handleChange}
						onBlur={handleBlur}
					/>

					<CustomSelect
						isRequired
						name='bloodType'
						label='Grupo sanguíneo'
						errorMessage={touched.bloodType && errors?.bloodType}
						isInvalid={hasData(touched.bloodType && errors?.bloodType)}
						value={bloodType}
						onBlur={handleBlur}
						options={bloodTypes}
						onChange={(e: any) => {
							void setFieldValue('bloodType', e.value);
						}}
					/>

					<CustomInput
						isRequired
						type='number'
						name='cellphone'
						label='Celular'
						errorMessage={touched.cellphone && errors?.cellphone}
						isInvalid={hasData(touched.cellphone && errors?.cellphone)}
						value={cellphone}
						onChange={handleChange}
						onBlur={handleBlur}
					/>

					<CustomInput
						type='number'
						name='homephone'
						label='Teléfono fijo'
						errorMessage={touched.homephone && errors?.homephone}
						isInvalid={hasData(touched.homephone && errors?.homephone)}
						value={homephone}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
				</div>

				{/* {insuranceObligatory?.corporateClientId && (
					<div
						key={nanoid()}
						className='bg-primary-10 border-primary border-1 py-3 px-4 rounded-md shadow-sm mt-6'
					>
						<Text
							value='Aseguradora obligatoria'
							variant='subTitle'
							color='primary'
							className='mb-2'
						/>

						<div className='grid gap-x-6 gap-y-4 justify-between grid-cols-2'>
							<CustomSelect
								isRequired
								isDisabled
								name='mandatoryCorporateClientId'
								label='Empresa'
								value={mandatoryCorporateClientId}
								options={companyTypes?.results}
							/>

							<CustomInput
								disabled
								isRequired
								name='mandatoryContractId'
								label='Contrato'
								value={mandatoryContractName}
							/>

							<CustomInput
								disabled
								isRequired
								name='mandatoryPopulationId'
								label='Población'
								value={mandatoryPopulation}
							/>

							<CustomInput
								disabled
								isRequired
								name='mandatoryCrtId'
								label='Grupo de ingreso'
								value={mandatoryCrtName}
							/>
						</div>
					</div>
				)} */}

				<div
					key={nanoid()}
					className='bg-primary-10 border-primary border-1 py-3 px-4 rounded-md shadow-sm mt-6'
				>
					<Text
						value='Aseguradora obligatoria'
						variant='subTitle'
						color='primary'
						className='mb-2'
					/>

					<div className='grid gap-x-6 gap-y-4 justify-between grid-cols-2'>
						<CustomSelect
							isRequired
							isDisabled={!hasData(document) || !hasData(docTypeId)}
							name='mandatoryCorporateClientId'
							label='Empresa'
							errorMessage={touched.mandatoryCorporateClientId && errors.mandatoryCorporateClientId}
							isInvalid={hasData(
								touched.mandatoryCorporateClientId && errors?.mandatoryCorporateClientId,
							)}
							value={mandatoryCorporateClientId}
							onBlur={handleBlur}
							options={companyTypes?.results}
							onChange={handleChangeMandatoryCorporateClient}
						/>

						{errorWS ? (
							<>
								<CustomSelect
									isRequired
									isDisabled={!hasData(mandatoryCorporateClientId)}
									name='mandatoryContractId'
									label='Contrato'
									errorMessage={touched.mandatoryContractId && errors.mandatoryContractId}
									isInvalid={hasData(touched.mandatoryContractId && errors?.mandatoryContractId)}
									value={mandatoryContractId}
									onBlur={handleBlur}
									options={clientContracts?.results}
									onChange={(e: any) => {
										void setFieldValue('mandatoryContractId', e.value);
									}}
								/>

								<CustomSelect
									isRequired
									isDisabled={!hasData(mandatoryContractId)}
									name='mandatoryPopulationId'
									label='Población'
									errorMessage={touched.mandatoryPopulationId && errors.mandatoryPopulationId}
									isInvalid={hasData(
										touched.mandatoryPopulationId && errors?.mandatoryPopulationId,
									)}
									value={mandatoryPopulationId}
									onBlur={handleBlur}
									options={contractPopulations?.results}
									onChange={(e: any) => {
										void setFieldValue('mandatoryPopulationId', e.value);
									}}
								/>

								<CustomSelect
									isRequired
									isDisabled={!hasData(mandatoryPopulationId)}
									name='mandatoryCrtId'
									label='Grupo de ingreso'
									errorMessage={touched.mandatoryCrtId && errors.mandatoryCrtId}
									isInvalid={hasData(touched.mandatoryCrtId && errors?.mandatoryCrtId)}
									value={mandatoryCrtId}
									onBlur={handleBlur}
									options={copaymentRate?.results}
									onChange={(e: any) => {
										void setFieldValue('mandatoryCrtId', e.value);
									}}
								/>
							</>
						) : (
							<>
								<CustomInput
									disabled
									isRequired
									name='mandatoryContractId'
									label='Contrato'
									value={mandatoryContractName}
									errorMessage={touched.mandatoryContractId && errors.mandatoryContractId}
									isInvalid={hasData(touched.mandatoryContractId && errors?.mandatoryContractId)}
								/>

								<CustomInput
									disabled
									isRequired
									name='mandatoryPopulationId'
									label='Población'
									value={mandatoryPopulation}
									errorMessage={touched.mandatoryPopulationId && errors.mandatoryPopulationId}
									isInvalid={hasData(
										touched.mandatoryPopulationId && errors?.mandatoryPopulationId,
									)}
								/>

								<CustomInput
									disabled
									isRequired
									name='mandatoryCrtId'
									label='Grupo de ingreso'
									value={mandatoryCrtName}
									errorMessage={touched.mandatoryCrtId && errors.mandatoryCrtId}
									isInvalid={hasData(touched.mandatoryCrtId && errors?.mandatoryCrtId)}
								/>
							</>
						)}
					</div>
				</div>

				<FieldArray
					name='contracts'
					render={arrayHelpers => (
						<div ref={parent}>
							{formik?.values?.contracts?.map((voluntary, index) => (
								<div
									key={voluntary?.id}
									className='bg-secondary-30 border-secondary border-1 py-3 px-4 rounded-md shadow-sm mt-6 relative'
								>
									{voluntary.companyTypeTag !== 'particular' && (
										<Close
											size={20}
											color='secondary'
											className={'right-4 top-3'}
											onClick={() => arrayHelpers.remove(index)}
										/>
									)}

									<Text
										value='Aseguradora voluntaria'
										variant='subTitle'
										color='secondary'
										className='mb-2'
									/>

									<div className='grid gap-x-6 gap-y-4 justify-between grid-cols-2'>
										<CustomSelect
											isRequired
											isDisabled={voluntary.companyTypeTag === 'particular'}
											inputId={`companyTypeTag_${formik?.values?.contracts?.[index]?.id}`}
											name={`contracts[${index}].companyTypeTag`}
											label='Tipo de empresa'
											value={formik?.values?.contracts?.[index]?.companyTypeTag}
											onBlur={formik.handleBlur}
											options={
												voluntary.companyTypeTag === 'particular'
													? [{ label: voluntary.companyTypeName, value: voluntary.companyTypeTag }]
													: voluntaryCompanyTypes
											}
											onChange={(e: any) => {
												void setFieldValue(`contracts[${index}].companyTypeTag`, e.value);
												void setFieldValue(`contracts[${index}].corporateClientId`, '');
												void setFieldValue(`contracts[${index}].contractId`, '');
												void setFieldValue(`contracts[${index}].policy`, '');
											}}
											errorMessage={
												((touched as JSONObject)[String(`companyTypeTag_${voluntary.id}` || '')] ||
													(touched?.contracts as unknown as IContract)?.[index]?.companyTypeTag) &&
												(errors?.contracts?.[index] as unknown as IContract)?.companyTypeTag
											}
											isInvalid={hasData(
												((touched as JSONObject)[String(`companyTypeTag_${voluntary.id}` || '')] ||
													(touched?.contracts as unknown as IContract)?.[index]?.companyTypeTag) &&
													(errors?.contracts?.[index] as unknown as IContract)?.companyTypeTag,
											)}
										/>

										<CustomSelect
											isRequired
											inputId={`corporateClientId_${formik?.values?.contracts?.[index]?.id}`}
											isDisabled={
												voluntary.companyTypeTag === 'particular' ||
												!hasData(formik?.values?.contracts?.[index]?.companyTypeTag)
											}
											name={`contracts[${index}].corporateClientId`}
											label='Empresa'
											value={formik?.values?.contracts?.[index]?.corporateClientId}
											onBlur={formik.handleBlur}
											options={
												voluntary.companyTypeTag === 'particular'
													? [
															{
																label: voluntary.corporateClient,
																value: voluntary.corporateClientId,
															},
													  ]
													: formik?.values?.contracts?.[index]?.companyTypeTag === 'prepaid'
													? allCompanyTypesPrepaid?.results
													: formik?.values?.contracts?.[index]?.companyTypeTag ===
													  'special_agreement'
													? allCompanyTypesSpecialAgreement?.results
													: []
											}
											onChange={(e: any) => {
												void setFieldValue(`contracts[${index}].corporateClientId`, e.value);
												void setFieldValue(`contracts[${index}].contractId`, '');
												void setFieldValue(`contracts[${index}].policy`, '');
											}}
											errorMessage={
												((touched as JSONObject)[
													String(`corporateClientId_${voluntary.id}` || '')
												] ||
													(touched?.contracts as unknown as IContract)?.[index]
														?.corporateClientId) &&
												(errors?.contracts?.[index] as unknown as IContract)?.corporateClientId
											}
											isInvalid={hasData(
												((touched as JSONObject)[
													String(`corporateClientId_${voluntary.id}` || '')
												] ||
													(touched?.contracts as unknown as IContract)?.[index]
														?.corporateClientId) &&
													(errors?.contracts?.[index] as unknown as IContract)?.corporateClientId,
											)}
										/>

										<CustomSelect
											isRequired
											inputId={`contractId_${formik?.values?.contracts?.[index]?.id}`}
											isDisabled={
												voluntary.companyTypeTag === 'particular' ||
												!hasData(formik?.values?.contracts?.[index]?.corporateClientId)
											}
											name={`contracts[${index}].contractId`}
											label='Contrato'
											value={formik?.values?.contracts?.[index]?.contractId || ''}
											onBlur={formik.handleBlur}
											options={allClientContracts?.results?.filter(
												contract =>
													contract.corporateClient ===
													formik?.values?.contracts?.[index]?.corporateClientId,
											)}
											onChange={(e: any) => {
												void setFieldValue(`contracts[${index}].contractId`, e.value);
												void setFieldValue(`contracts[${index}].policy`, '');
											}}
											errorMessage={
												((touched as JSONObject)[String(`contractId_${voluntary.id}` || '')] ||
													(touched?.contracts as unknown as IContract)?.[index]?.contractId) &&
												(errors?.contracts?.[index] as unknown as IContract)?.contractId
											}
											isInvalid={hasData(
												((touched as JSONObject)[String(`contractId_${voluntary.id}` || '')] ||
													(touched?.contracts as unknown as IContract)?.[index]?.contractId) &&
													(errors?.contracts?.[index] as unknown as IContract)?.contractId,
											)}
										/>

										<CustomInput
											disabled={
												voluntary.companyTypeTag === 'particular' ||
												!hasData(formik?.values?.contracts?.[index]?.contractId)
											}
											name='policy'
											label='No. de Póliza'
											value={formik?.values?.contracts?.[index]?.policy}
											onBlur={handleBlur}
											onChange={({ target }) => {
												void setFieldValue(`contracts[${index}].policy`, target.value);
											}}
											errorMessage={
												((touched as JSONObject)[String('policy')] ||
													(touched?.contracts as unknown as IContract)?.[index]?.policy) &&
												(errors?.contracts?.[index] as unknown as IContract)?.policy
											}
											isInvalid={hasData(
												((touched as JSONObject)[String('policy')] ||
													(touched?.contracts as unknown as IContract)?.[index]?.policy) &&
													(errors?.contracts?.[index] as unknown as IContract)?.policy,
											)}
										/>
									</div>
								</div>
							))}

							{(formik?.values?.contracts?.length || 0) < voluntaryCompanyTypes.length - 1 && (
								<Button
									disableRipple
									variant='light'
									data-hover={false}
									data-focus={false}
									data-focus-visible={false}
									data-pressed={false}
									className={`hover:bg-transparent text-secondary hover:text-primary px-0 outline-none font-bold text-base ${
										formik?.values?.contracts?.length === 0 && 'mt-3'
									}`}
									startContent={<IconCirclePlus size={20} />}
									onClick={() => {
										const newInsurers: IContract = {
											id: nanoid(),
											companyTypeTag: '',
											corporateClientId: 0,
											contractId: 0,
											policy: '',
											isMain: 0,
											wsValidated: 0,
										};
										arrayHelpers.push({ ...newInsurers });
									}}
								>
									Agregar aseguradora voluntaria
								</Button>
							)}
						</div>
					)}
				/>

				<div className='w-full flex'>
					<Button
						color='secondary'
						className={`ml-auto ${
							(contracts?.length || 0) === voluntaryCompanyTypes.length - 1 ? 'mt-7' : ''
						}   `}
						type='submit'
					>
						Guardar
					</Button>
				</div>
			</form>
		</FormikProvider>
	);
};
