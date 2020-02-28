import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Map, MapProps, Markers, Marker, InfoWindow, InfoWindowProps } from 'react-amap';
import { gql, useSubscription } from '@apollo/client';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import { useObservable, useEventCallback } from 'rxjs-hooks';
import { map, withLatestFrom } from 'rxjs/operators'
import { v4 as uuid } from 'uuid';
import useParam from '@/utils/useParam';
import { Paper, InputBase, IconButton, Divider } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const Wrapper = styled.div`
  position: relative;
  height: 100%;

  > .map {
    position: absolute;
    top: 0;
    left: 0;
  }

  > .search {
    position: absolute;
    top: 1.6rem;
    left: 1.6rem;
    
    > form.MuiPaper-root {
      padding: 2px 4px 2px 16px;
      display: flex;
      align-items: center;
      width: 400;

      > input {
        flex: 1;
      }

      > hr.MuiDivider-root {
        height: 28px;
        margin: 4px;
      }
    }
  }
`

interface Job {
  clientId: string
  fetchId: string
  id: string
  name: string
  company: string
  pay: string
  address: string
  location: [number, number]
}

const subscriptionJobs = gql`
  subscription Jobs($keyword: String!){
    jobs(type: "gxrc", keyword: $keyword) {
      id,
      name,
      company,
      pay,
      address,
      location,
    }
  }
`;

const subscriptionJob = gql`
  subscription Job($keyword: String!, $clientId: String!, $fetchId: String!){
    job(clientId: $clientId, fetchId: $fetchId, type: "gxrc", keyword: $keyword) {
      clientId,
      fetchId,
      id,
      name,
      company,
      pay,
      address,
      location,
    }
  }
`;

export default function () {
  const center: MapProps['center'] = useMemo(() => [108.363911, 22.811535], []);
  const plugins: MapProps['plugins'] = useMemo(() => ['ToolBar'], []);
  const infoWindowOffset: InfoWindowProps['offset'] = useMemo(() => [0, -30], []);
  const clientId = useMemo(() => uuid(), [])

  const [showInfoWindowId, setShowInfoWindowId] = useState('')

  const { param, setParamByKey, fetchId } = useParam({
    keyword: 'web前端'
  })

  const { loading, error, data } = useSubscription<{ job: Job }>(subscriptionJob, { variables: { keyword: param.keyword, clientId, fetchId } })
  // console.log(data)
  const [jobs] = useObservable<[Job[], string], [typeof data, string]>((inputs$, state$) => inputs$.pipe(
    withLatestFrom(state$),
    map(([[_data, _fetchId], [preData, preFetchId]]) => {
      if (_fetchId === preFetchId) {
        if (_data?.job && _data.job.fetchId === _fetchId && !preData.some(p => p.id === _data.job.id)) {
          return [[...preData, _data?.job], _fetchId]
        } else {
          return [preData, _fetchId]
        }
      } else {
        return [[], _fetchId]
      }
    }),
  ), [[], fetchId], [data, fetchId])

  const [onSearchChange, searchValue] = useEventCallback<React.ChangeEvent<HTMLTextAreaElement>, string>((event$) =>
    event$.pipe(
      map(event => event.target.value),
    ),
    param.keyword
  )

  error && console.log(error)
  // const jobs: Job[] = data?.jobs ?? []

  const showJob = jobs.find(j => j.id === showInfoWindowId)

  const events = useMemo(() => ({
    click: (e: any) => {
      const id = e.target?.B?.extData.id
      setShowInfoWindowId(id)
    }
  }), [])

  const onClickSearch = useCallback(() => {
    setParamByKey('keyword', searchValue)
  }, [searchValue, setParamByKey])

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error?.message}</p>;

  return (
    <Wrapper>
      <Map
        zoom={14}
        plugins={plugins}
        center={center}
      >
        {
          jobs.map(j => (
            <Marker
              key={j.id}
              position={j.location}
              events={events}
              label={j.name}
              extData={j}
            >
              <div style={{ background: '#aaa', color: '#000' }}>
                {j.name}
              </div>
            </Marker>
          ))
        }
        {
          showJob && (
            <InfoWindow
              position={showJob.location}
              isCustom={true}
              visible={true}
              offset={infoWindowOffset}
            >
              <h3>{showJob.name}</h3>
              <div>{showJob.company}</div>
              <p>{showJob.address}</p>
              <p>{showJob.pay}</p>
            </InfoWindow>
          )
        }

      </Map>
      <div className="search">
        {/* <TextField
          label="职位"
          variant="filled"
          value={param.keyword}
          onChange={onKeywordChange}
        /> */}
        <Paper component="form">
          <InputBase
            placeholder="职位搜索..."
            inputProps={{ 'aria-label': '职位搜索...' }}
            value={searchValue}
            onChange={onSearchChange}
          />
          <IconButton
            type="submit"
            onClick={onClickSearch}
          >
            <SearchIcon />
          </IconButton>
          <Divider orientation="vertical" />
          <IconButton color="primary" aria-label="directions">
            <DirectionsIcon />
          </IconButton>
        </Paper>
      </div>
    </Wrapper>
  );
}
