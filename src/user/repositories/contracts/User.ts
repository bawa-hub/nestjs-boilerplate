import { RepositoryContract } from '@libs/core';
import {SearchUserDocument} from '../../interface'

export interface UserRepositoryContract extends RepositoryContract{
    search(inputs:SearchUserDocument)
};
