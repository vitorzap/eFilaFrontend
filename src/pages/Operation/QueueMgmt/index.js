import React, { Component } from 'react';
import io from 'socket.io-client';
import api from '../../../services/api';
import Alert from 'react-bootstrap/Alert';
import { logout, getLoggedUserCompanyId } from '../../../services/auth';
import {
  getHourMin,
  milisegToHourSeg
} from '../../../utilities/timeFunctions.js';

import Startqueues from '../../../components/Startqueues';
import Enqueue from '../../../components/Enqueue';
import Dequeue from '../../../components/Dequeue';

import { StdRow, StdCol } from '../../../styles/main';

import {
  PageContainer,
  QueueContainer,
  NumberPosContainer,
  UsedPosContainer,
  ButtonPosContainer,
  PageHeader,
  HeaderButton,
  PosButton
} from './styles';

class QueueMgmt extends Component {
  state = {
    getDbStatus: 'wait',
    error: '',
    errorLevel: '',
    today: new Date(),
    noQueues: 0,
    queues: [],
    positions: [],
    maxPositions: 0,
    waits: [],
    intervalId: ''
  };

  componentDidMount() {
    this.registerToSocket();
    this.getQueuesAndPositions();
    const intervalId = setInterval(() => {
      this.setState({
        waits: this.state.positions.map(position =>
          milisegToHourSeg(Date.now() - position.arrived_at)
        )
      });
    }, 60000);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  registerToSocket = () => {
    const socket = io.connect(process.env.REACT_APP_API_URL);

    socket.on('startqueues' + getLoggedUserCompanyId(), () =>
      this.getQueuesAndPositions()
    );
    socket.on('enqueue' + getLoggedUserCompanyId(), returnObj =>
      this.LocalEnqueue(returnObj)
    );
    socket.on('dequeue' + getLoggedUserCompanyId(), returnObj =>
      this.LocalDequeue(returnObj)
    );
  };

  LocalEnqueue = returnObj => {
    const { opPosition, opQueue } = returnObj;
    let wPositions = this.state.positions;
    const posIds = wPositions.map(position => position._id);
    const iDupl = posIds.indexOf(opPosition._id);
    opPosition.arrived_at = new Date(Date.parse(opPosition.arrived_at));
    if (iDupl === -1) wPositions.push(opPosition);
    wPositions = wPositions.sort((a, b) => {
      if (a.queue_id > b.queue_id) return 1;
      if (a.queue_id < b.queue_id) return -1;
      if (a.position >= b.position) return 1;
      else return -1;
    });
    const iQueue = this.state.queues
      .map(queue => queue._id)
      .indexOf(opQueue._id);
    const wQueues = this.state.queues;
    wQueues[iQueue].first_position = opQueue.first_position;
    wQueues[iQueue].last_position = opQueue.last_position;
    wQueues[iQueue].positions = opQueue.positions;
    const arrayPositions = wQueues.map(queue => queue.positions);
    const maxPositions = Math.max(...arrayPositions);
    this.setState({ positions: wPositions });
    this.setState({ queues: wQueues });
    this.setState({ maxPositions: maxPositions });
  };

  LocalDequeue = returnObj => {
    const { opPosition, opQueue } = returnObj;
    let wPositions = this.state.positions.filter(
      position => position._id !== opPosition._id
    );
    const iQueue = this.state.queues
      .map(queue => queue._id)
      .indexOf(opQueue._id);
    const wQueues = this.state.queues;
    wQueues[iQueue].first_position = opQueue.first_position;
    wQueues[iQueue].positions = opQueue.positions;
    wQueues[iQueue].wait = opQueue.wait;
    wQueues[iQueue].fmtWait = milisegToHourSeg(opQueue.wait);
    const arrayPositions = wQueues.map(queue => queue.positions);
    const maxPositions = Math.max(...arrayPositions);
    this.setState({ positions: wPositions });
    this.setState({ queues: wQueues });
    this.setState({ maxPositions: maxPositions });
  };

  async getQueuesAndPositions() {
    let msgErro = '';
    try {
      const responseQ = await api.get('opqueues');
      let queues = responseQ.data;
      if (queues.length > 0) {
        for (let i = 0; i < queues.length; i = i + 1) {
          queues[i].fmtWait = milisegToHourSeg(queues[i].wait);
        }
        this.setState({ queues: queues });
        this.setState({ noQueues: queues.length });
        const responseP = await api.get('oppositions');
        let positions = responseP.data;
        positions = positions.map(pos => {
          pos.arrived_at = new Date(Date.parse(pos.arrived_at));
          return pos;
        });
        const wFmtWaits = positions.map(pos => {
          return milisegToHourSeg(Date.now() - pos.arrived_at);
        });
        this.setState({ positions: positions });
        const arrayPositions = queues.map(queue => queue.positions);
        const maxPositions = Math.max(...arrayPositions);
        this.setState({ maxPositions: maxPositions });
        this.setState({ waits: wFmtWaits });
      } else {
        this.setState({ maxPositions: 0 });
        this.setState({ error: 'Filas não inicias ' });
      }
      this.setState({ getDbStatus: 'ready' });
    } catch (err) {
      this.state.errorLevel = 'danger';
      if (err.response) {
        const { error } = err.response.data;
        if (error === 'Usuario não autorizado') {
          logout();
        }
        msgErro = `response - ${error}`;
      } else {
        msgErro = `Outro - ${err.message}`;
      }
      this.setState({ error: msgErro });
      this.setState({ today: new Date() });
    }
  }

  render() {
    const sToday = this.state.today.toLocaleString('pt-BR', {
      timeZone: 'UTC'
    });
    const queueWidth = Math.floor(12 / this.state.noQueues);
    const rowMargin = Math.floor((12 % this.state.noQueues) / 2);
    const mapa = new Array(this.state.noQueues);
    let i;
    let queuePositions = this.state.queues.map(queue => 0);
    if (this.state.noQueues > 0 && this.state.maxPositions > 0) {
      for (i = 0; i < this.state.noQueues; i = i + 1) {
        mapa[i] = new Array(this.state.maxPositions).fill(-1);
      }
      const queueColumns = this.state.queues.map(queue => queue.queue_id);
      queuePositions = this.state.queues.map(queue => 0);
      for (i = 0; i < this.state.positions.length; i = i + 1) {
        let qCol = queueColumns.indexOf(this.state.positions[i].queue_id);
        queuePositions[qCol] = queuePositions[qCol] + 1;
        if (queuePositions[qCol] <= this.state.queues[qCol].positions) {
          mapa[qCol][queuePositions[qCol] - 1] = i;
        }
      }
    }
    return (
      <PageContainer fluid={true}>
        <StdRow sm={12}>
          <StdCol sm={8}>
            <PageHeader>
              <p>Gerenciamento de filas - {sToday}</p>
            </PageHeader>
          </StdCol>
          <StdCol sm={4}>
            <Startqueues noQueues={this.state.queues.length} />
            <HeaderButton onClick={e => this.getQueuesAndPositions()}>
              Atualizar
            </HeaderButton>
          </StdCol>
        </StdRow>
        {this.state.queues.length === 0 && (
          <div>
            {this.state.getDbStatus === 'ready' && (
              <Alert variant="danger" fade="false">
                Filas não iniciadas ou Não existe nenhuma fila cadastrada
              </Alert>
            )}
            {this.state.getDbStatus === 'wait' && (
              <Alert variant="danger" fade="false">
                Recuperando dados. Aguarde...
              </Alert>
            )}
          </div>
        )}
        <StdRow sm={12}>
          {rowMargin > 0 && <StdCol sm={Math.ceil(rowMargin)}></StdCol>}
          {this.state.queues.map((queue, index) => (
            <StdCol sm={queueWidth} key={index}>
              <QueueContainer colnumber={index}>
                <StdRow sm={12}>
                  <StdCol sm={9}>
                    <label>{queue.description} </label>
                  </StdCol>
                  <StdCol sm={3}>
                    <p>
                      {queue.positions}pos
                      <br />
                      {queue.fmtWait}
                    </p>
                  </StdCol>
                </StdRow>
              </QueueContainer>
            </StdCol>
          ))}
        </StdRow>
        <StdRow sm={12}>
          {rowMargin > 0 && <StdCol sm={Math.ceil(rowMargin)}></StdCol>}
          {this.state.queues.map((queue, index) => (
            <StdCol sm={queueWidth} key={index}>
              <ButtonPosContainer>
                {queuePositions && queuePositions[index] > 0 && (
                  <>
                    <Dequeue
                      queue={queue}
                      first={
                        this.state.positions.filter(
                          position => position.queue_id === queue.queue_id
                        )[0]
                      }
                      dequeueFunction={this.deQueue}
                    />
                  </>
                )}
                {queuePositions && queuePositions[index] === 0 && (
                  <Enqueue queue={queue} />
                )}
              </ButtonPosContainer>
            </StdCol>
          ))}
        </StdRow>
        {[...Array(this.state.maxPositions).keys()].map(row => (
          <StdRow key={row} sm={12}>
            {rowMargin > 0 && <StdCol sm={Math.ceil(rowMargin)}></StdCol>}
            {this.state.queues.map((queue, index) => (
              <StdCol sm={queueWidth} key={index}>
                <StdRow sm={12}>
                  {mapa[index][row] !== -1 && (
                    <>
                      <StdCol sm={2}>
                        <NumberPosContainer colnumber={index}>
                          <PosButton
                            colnumber={index}
                            variant="primary"
                            onClick={this.handleShow}
                          >
                            <p>{row + 1}</p>
                          </PosButton>
                        </NumberPosContainer>
                      </StdCol>
                      <StdCol sm={10}>
                        <UsedPosContainer
                          colnumber={index}
                          onMouseDown={e => {
                            let lins = e.target.innerHTML.split('<br>');
                            e.target.innerHTML =
                              lins[0] + '<br />' + lins[2] + '<br>' + lins[1];
                          }}
                        >
                          <p>
                            {this.state.positions[mapa[index][row]].name}
                            <br />
                            {getHourMin(
                              this.state.positions[mapa[index][row]].arrived_at
                            )}{' '}
                            - {`E(${this.state.waits[mapa[index][row]]})`}
                            {/* {(
                              '0' +
                              this.state.positions[
                                mapa[index][row]
                              ].arrived_at.getHours()
                            ).slice(-2)}
                            :
                            {(
                              '0' +
                              this.state.positions[
                                mapa[index][row]
                              ].arrived_at.getMinutes()
                            ).slice(-2)} */}
                            <br />
                            {this.state.positions[mapa[index][row]].phone}
                          </p>
                        </UsedPosContainer>
                      </StdCol>
                    </>
                  )}
                  {row > 0 &&
                    mapa[index][row] === -1 &&
                    mapa[index][row - 1] !== -1 && (
                      <>
                        <StdCol sm={12}>
                          <ButtonPosContainer>
                            <Enqueue queue={queue} />
                          </ButtonPosContainer>
                        </StdCol>
                      </>
                    )}
                </StdRow>
              </StdCol>
            ))}
          </StdRow>
        ))}
        <StdRow sm={12}>
          {rowMargin > 0 && <StdCol sm={Math.ceil(rowMargin)}></StdCol>}
          {this.state.queues.map((queue, index) => (
            <StdCol sm={queueWidth} key={index}>
              <ButtonPosContainer>
                {queuePositions &&
                  this.state.maxPositions !== 0 &&
                  queuePositions[index] === this.state.maxPositions && (
                    <Enqueue queue={queue} />
                  )}
              </ButtonPosContainer>
            </StdCol>
          ))}
        </StdRow>
      </PageContainer>
    );
  }
}

export default QueueMgmt;
