import { StatusBase } from './StatusBase.js';

export class StatusDisponivel extends StatusBase {
    getStatus() {
        return 'Disponível';
    }
}
