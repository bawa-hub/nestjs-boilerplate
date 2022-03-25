import {SearchApplicationDocument } from '@app/applications/interface';
import { RepositoryContract } from '@libs/core';

export interface ApplicationRepositoryContract extends RepositoryContract{
    search(inputs:SearchApplicationDocument)
};