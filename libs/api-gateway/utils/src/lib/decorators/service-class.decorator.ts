import { SetMetadata } from '@nestjs/common';

export const SERVICE_CLASS_KEY = 'service:class';

export const ServiceClass = (serviceClass: any) => SetMetadata(SERVICE_CLASS_KEY, serviceClass);

export default ServiceClass;
