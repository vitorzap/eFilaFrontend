import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ActionButton from '../../../components/ActionButton';
import OrderButton from '../../../components/OrderButton';
import Paginator from '../../../components/Paginator';
import {
  getPageRange,
  getPageSetState,
  ListState
} from '../../../components/ListFunctions/index.js';
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

class ListQueueType extends Component {
  state = ListState;

  async componentDidMount() {
    const params = new URLSearchParams(this.props.params);
    const page = parseInt(params.get('page')) || 1;
    if (page !== this.state.actualPage) {
      getPageSetState('queuetypes', page, this.state.sortField, this);
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
              <p>Tipos de Fila</p>
            </PageHeader>
          </StdCol>
          <StdCol sm={4}>
            {(getLoggedUserType() === Constants.USER_ROOT ||
              getLoggedUserType() === Constants.USER_LOCALROOT) && (
              <Link to="/createqueuetype">
                <HeaderButton>Incluir</HeaderButton>
              </Link>
            )}
          </StdCol>
        </StdRow>
        <TitRow sm={12}>
          {[
            { label: 'Descrição', field: 'description', length: 6 },
            {
              label: 'Empresa',
              field: 'company.name',
              length:
                getLoggedUserType() === Constants.USER_ROOT ||
                getLoggedUserType() === Constants.USER_LOCALROOT
                  ? 5
                  : 6
            }
          ].map((column, index) => (
            <TitCol key={index} sm={column.length}>
              <p>
                <OrderButton
                  apiAction="queuetypes"
                  label={column.label}
                  newSortField={column.field}
                  caller={this}
                  actualSortField={this.state.sortField}
                  getPage={getPageSetState}
                />
              </p>
            </TitCol>
          ))}
          {(getLoggedUserType() === Constants.USER_ROOT ||
            getLoggedUserType() === Constants.USER_LOCALROOT) && (
            <TitCol sm={1}>
              <p>Ações</p>
            </TitCol>
          )}
        </TitRow>
        {this.state.totalItems === 0 && <p>Nenhuma tipo de fila cadastrada</p>}
        {this.state.totalItems !== 0 &&
          this.state.items.map((queuetype, rowNumber) => (
            <TableRow sm={12} key={queuetype.id}>
              <TableCol sm={6} rownumber={rowNumber}>
                <p>{queuetype.description}</p>
              </TableCol>
              <TableCol
                sm={
                  getLoggedUserType() === Constants.USER_ROOT ||
                  getLoggedUserType() === Constants.USER_LOCALROOT
                    ? 5
                    : 6
                }
                rownumber={rowNumber}
              >
                <p>{queuetype.company.name}</p>
              </TableCol>
              {(getLoggedUserType() === Constants.USER_ROOT ||
                getLoggedUserType() === Constants.USER_LOCALROOT) && (
                <TableCol sm={1} rownumber={rowNumber}>
                  <p>
                    {['edit', 'delete'].map((action, index) => (
                      <ActionButton
                        key={index}
                        kind={action}
                        link={`/${action}queuetype/${queuetype.id}`}
                        id={queuetype.id}
                        param={{ queuetype }}
                      />
                    ))}
                  </p>
                </TableCol>
              )}
            </TableRow>
          ))}
        <PagerContainer>
          <Paginator
            apiAction="queuetypes"
            pageNumbers={pageNumbers}
            order={this.state.sortField}
            getPage={getPageSetState}
            caller={this}
          />
        </PagerContainer>
      </PageContainer>
    );
  }
}

export default ListQueueType;
