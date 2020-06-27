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

class ListQueue extends Component {
  state = ListState;

  async componentDidMount() {
    const params = new URLSearchParams(this.props.params);
    const page = parseInt(params.get('page')) || 1;
    if (page !== this.state.actualPage) {
      getPageSetState('queues', page, this.state.sortField, this);
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
        {this.state.totalItems !== 0 && (
          <>
            <StdRow sm={12}>
              <StdCol sm={8}>
                <PageHeader>
                  <p>Filas</p>
                </PageHeader>
              </StdCol>
              <StdCol sm={4}>
                {(getLoggedUserType() === Constants.USER_ROOT ||
                  getLoggedUserType() === Constants.USER_LOCALROOT) && (
                  <Link to="/createqueue">
                    <HeaderButton>Incluir</HeaderButton>
                  </Link>
                )}
              </StdCol>
            </StdRow>
            <TitRow sm={12}>
              {[
                { label: 'Descrição', field: 'description', length: 5 },
                {
                  label: 'Tipo de Fila',
                  field: 'queue_type.description',
                  length:
                    getLoggedUserType() === Constants.USER_ROOT ||
                    getLoggedUserType() === Constants.USER_LOCALROOT
                      ? 3
                      : 4
                },
                { label: 'Empresa', field: 'company.name', length: 3 }
              ].map((column, index) => (
                <TitCol key={index} sm={column.length}>
                  <p>
                    <OrderButton
                      apiAction="queues"
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
            {this.state.items.map((queue, rowNumber) => (
              <TableRow sm={12} key={queue.id}>
                <TableCol sm={5} rownumber={rowNumber}>
                  <p>{queue.description}</p>
                </TableCol>
                <TableCol
                  sm={
                    getLoggedUserType() === Constants.USER_ROOT ||
                    getLoggedUserType() === Constants.USER_LOCALROOT
                      ? 3
                      : 4
                  }
                  rownumber={rowNumber}
                >
                  <p>{queue.queue_type.description}</p>
                </TableCol>
                <TableCol sm={3} rownumber={rowNumber}>
                  <p>{queue.company.name}</p>
                </TableCol>
                {(getLoggedUserType() === Constants.USER_ROOT ||
                  getLoggedUserType() === Constants.USER_LOCALROOT) && (
                  <TableCol sm={1} rownumber={rowNumber}>
                    <p>
                      {['edit', 'delete'].map((action, index) => (
                        <ActionButton
                          key={index}
                          kind={action}
                          link={`/${action}queue/${queue.id}`}
                          id={queue.id}
                          param={{ queue }}
                        />
                      ))}
                    </p>
                  </TableCol>
                )}
              </TableRow>
            ))}
            <PagerContainer>
              <Paginator
                apiAction="queues"
                pageNumbers={pageNumbers}
                order={this.state.sortField}
                getPage={this.getNewPage}
                caller={this}
              />
            </PagerContainer>
          </>
        )}
      </PageContainer>
    );
  }
}

export default ListQueue;
