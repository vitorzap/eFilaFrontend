import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ActionButton from '../../../components/ActionButton';
import OrderButton from '../../../components/OrderButton';
import Paginator from '../../../components/Paginator';
import {
  getPageRange,
  getPageSetState,
  ListState
} from '../../../components/ListFunctions';
import MsgArea from '../../../components/MsgArea';
import { getLoggedUserType } from '../../../services/auth';
import * as Constants from '../../../constants/general';

import { StdRow, StdCol } from '../../../styles/main';

import {
  PageContainer,
  PageHeader,
  HeaderButton,
  TitRow,
  TitCol,
  TableRow,
  TableCol,
  PagerContainer
} from '../list-styles';

import * as crudConstants from '../../../constants/crud';

class ListCompany extends Component {
  state = ListState;

  async componentDidMount() {
    const params = new URLSearchParams(this.props.params);
    const page = parseInt(params.get('page')) || 1;
    if (page !== this.state.actualPage) {
      getPageSetState('companies', page, this.state.sortField, this);
    }
  }

  render() {
    const pageNumbers = getPageRange(
      this.state.currentPage,
      this.state.totalPages,
      crudConstants.NEIGHBORHOOD
    );
    return (
      <PageContainer fluid={true}>
        <MsgArea totalItems={this.state.totalItems} error={this.state.error} />
        <StdRow sm={12}>
          <StdCol sm={8}>
            <PageHeader>
              <p>Empresas</p>
            </PageHeader>
          </StdCol>
          <StdCol sm={4}>
            {' '}
            {getLoggedUserType() === Constants.USER_ROOT && (
              <Link to="/createcompany">
                <HeaderButton>Incluir</HeaderButton>
              </Link>
            )}
          </StdCol>
        </StdRow>
        <TitRow sm={12}>
          {[
            { label: 'Nome', field: 'name', length: 5 },
            {
              label: 'EMail',
              field: 'email',
              length: getLoggedUserType() === Constants.USER_ROOT ? 5 : 6
            },
            { label: 'É raiz', field: 'is_root', length: 1 }
          ].map((column, index) => (
            <TitCol key={index} sm={column.length}>
              <p>
                <OrderButton
                  apiAction="companies"
                  label={column.label}
                  newSortField={column.field}
                  caller={this}
                  actualSortField={this.state.sortField}
                  getPage={getPageSetState}
                />
              </p>
            </TitCol>
          ))}
          {getLoggedUserType() === Constants.USER_ROOT && (
            <TitCol sm={1}>
              <p>Ações</p>
            </TitCol>
          )}
        </TitRow>
        {this.state.totalItems === 0 && <p>Nenhuma empresa cadastrada</p>}
        {this.state.totalItems !== 0 &&
          this.state.items.map((company, rowNumber) => (
            <TableRow sm={12} key={company.id}>
              <TableCol sm={5} rownumber={rowNumber}>
                <p>{company.name}</p>
              </TableCol>
              <TableCol
                sm={getLoggedUserType() === Constants.USER_ROOT ? 5 : 6}
                rownumber={rowNumber}
              >
                <p>{company.email}</p>
              </TableCol>
              <TableCol sm={1} rownumber={rowNumber}>
                <p>{company.is_root ? 'Sim' : 'Não'}</p>
              </TableCol>
              {getLoggedUserType() === Constants.USER_ROOT && (
                <TableCol sm={1} rownumber={rowNumber}>
                  <p>
                    {['edit', 'delete'].map((action, index) => (
                      <ActionButton
                        key={index}
                        kind={action}
                        link={`/${action}company/${company.id}`}
                        id={company.id}
                        param={{ company }}
                      />
                    ))}
                  </p>
                </TableCol>
              )}
            </TableRow>
          ))}
        <PagerContainer>
          <Paginator
            apiAction="companies"
            pageNumbers={pageNumbers}
            order={this.state.sortField}
            getPage={getPageSetState}
            caller={this}
          />
        </PagerContainer>
        )}
      </PageContainer>
    );
  }
}

export default ListCompany;
