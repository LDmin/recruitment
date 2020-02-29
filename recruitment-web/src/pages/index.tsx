import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { Map, MapProps, Markers, Marker, InfoWindow, InfoWindowProps, ArrayLngLat, MarkerProps } from 'react-amap';
import { gql, useSubscription } from '@apollo/client';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import { useObservable, useEventCallback } from 'rxjs-hooks';
import { map, withLatestFrom, mergeMap } from 'rxjs/operators'
import { v4 as uuid } from 'uuid';
import useParam from '@/utils/useParam';
import { Paper, InputBase, IconButton, Divider, Select, MenuItem, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import JobList from '@/components/JobList';
import SelectCity from '@/components/SelectCity';
import SpaceBetween from '@/components/SpaceBetween';
import citys from '@/utils/city';
import Author from '@/components/Author';
import { useLocalStorageState } from 'react-storage-hooks';

const Wrapper = styled.div`
  position: relative;
  height: 100%;

  > .map {
    position: absolute;
    top: 0;
    left: 0;
  }

  > .left {
    position: absolute;
    top: 1.6rem;
    left: 1.6rem;

    > .MuiPaper-root {
      /* padding: 2px 4px 2px 16px; */
      padding: 0 16px;
      display: flex;
      align-items: center;
      width: 400;

      input {
        font-size: 0.875rem;
      }

      > hr.MuiDivider-root {
        height: 28px;
        margin: 4px;
      }
    }

    > .list {
      margin-top: .8rem;
      width: 25rem;
      height: calc(100vh - 7.2rem);
      overflow: auto;
    }
  }

  > .right {
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;

    > .MuiPaper-root {
      padding: 4px 16px;
      display: flex;
      align-items: center;
    }

  }

`

const MarkerContentWrapper = styled(Paper)`
  padding: 8px;
  width: 14px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  border-radius: 50%;
  /* background: orange; */
`

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
  subscription Job($keyword: String!, $clientId: String!, $fetchId: String!, $cityId: Float!){
    job(clientId: $clientId, fetchId: $fetchId, type: "gxrc", keyword: $keyword, cityId: $cityId) {
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
  const ReactAMap = useRef<{ ins?: any, districtSearch?: any }>({})
  const plugins: MapProps['plugins'] = useMemo(() => ['ToolBar'], []);
  const infoWindowOffset: InfoWindowProps['offset'] = useMemo(() => [0, -30], []);
  const markerOffset: MarkerProps['offset'] = useMemo(() => [-12, -20], []);
  const clientId = useMemo(() => uuid(), [])
  const [mapSelectMode, setMapSelectMode] = useState<'map' | 'home'>('map')
  const [homeLocation, setHomeLocation] = useLocalStorageState<any>('homeLocation', null)

  const [showInfoWindowId, setShowInfoWindowId] = useState('')

  const [onCityChange, { selectedCity }] = useEventCallback<City, { selectedCity: City }>((event$) =>
    event$.pipe(
      mergeMap(async (city: City) => {
        if (city.location) {
          return { selectedCity: city }
        } else {
          const aaa = await ReactAMap.current.districtSearch?.search(city.name)
          // if (aaa?.result?.info === 'OK') {
          const center = aaa?.result.districtList[0].center
          // console.log(aaa, center)
          const _city: City = {
            ...city,
            location: [center.lng, center.lat]
          }
          return {
            selectedCity: _city
          }
          // }
        }

      }),
      // map(([city]) => [city]),
    ),
    {
      selectedCity: citys.find(c => c.id === 2)!
    }
  )

  const { param, setParam, fetchId } = useParam({
    keyword: '小学英语老师',
    cityId: selectedCity.id,
  })

  // const [selectedCity, setSelectedCity] = useState<City>(() => citys.find(c => c.id === param.cityId)!)

  const { loading, error, data } = useSubscription<{ job: Job }>(subscriptionJob, {
    variables: {
      keyword: param.keyword,
      clientId,
      fetchId,
      cityId: param.cityId,
    }
  })
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

  const showInfoWindow = useCallback((job: Job) => {
    ReactAMap.current.ins?.panTo(job.location)
    setShowInfoWindowId(job.id)
  }, [])

  const markerEvents = useMemo(() => ({
    click: (e: any) => {
      const job = e.target?.B?.extData;
      showInfoWindow(job)
    }
  }), [showInfoWindow])

  const mapEvents = useMemo(() => ({
    created: (ins: any) => {
      ReactAMap.current.ins = ins
      window.AMap.plugin('AMap.DistrictSearch', () => {
        ReactAMap.current.districtSearch = {
          search: (value: string) => new Promise((resolve) => {
            const districtSearch = new window.AMap.DistrictSearch({
              subdistrict: 0,
            })
            districtSearch.search(value, (status: string, result: any) => {
              resolve({ status, result })
            })
          })
        }
      });
    },
    click: (e: any) => {
      if (mapSelectMode === 'map') {
        showInfoWindowId && setShowInfoWindowId('')
      } else if (mapSelectMode === 'home') {
        setHomeLocation([e.lnglat.lng, e.lnglat.lat])
        setMapSelectMode('map')
      }
    }
  }), [showInfoWindowId, mapSelectMode])

  const onClickSearch = useCallback(() => {
    setParam({
      keyword: searchValue,
      cityId: selectedCity.id,
    })
  }, [searchValue, selectedCity.id, setParam])

  const onClickSetHome = useCallback(() => {
    setMapSelectMode('home')
  }, [])

  let homeText: React.ReactNode
  if (mapSelectMode === 'home') {
    homeText = <span className="text-muted">正在设置家的位置...</span>
  } else {
    if (homeLocation) {
      homeText = homeLocation.join(',')
    } else {
      homeText = <span className="text-muted">设置家的位置...</span>
    }
  }

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error?.message}</p>;

  return (
    <Wrapper>
      <Map
        zoom={14}
        plugins={plugins}
        center={selectedCity.location}
        events={mapEvents}
      >
        {
          jobs.map((j, i) => (
            <Marker
              key={j.id}
              position={j.location}
              events={markerEvents}
              label={j.name}
              extData={j}
              offset={markerOffset}
            >
              <MarkerContentWrapper>
                {i + 1}
              </MarkerContentWrapper>
            </Marker>
          ))
        }
        {
          homeLocation && (
            <Marker
              position={homeLocation}
              offset={markerOffset}
            >
              <HomeIcon color="primary" />
            </Marker>
          )
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
      <div className="left">
        <Paper>
          <SelectCity value={selectedCity} onChange={onCityChange} />
          <SpaceBetween width></SpaceBetween>
          <Divider orientation="vertical" />
          <SpaceBetween width></SpaceBetween>
          <InputBase
            placeholder="职位搜索..."
            // inputProps={{ 'aria-label': '职位搜索...' }}
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
          <Button color="primary" onClick={onClickSetHome}>
            <HomeIcon color="primary" />
            {homeText}
          </Button>
        </Paper>
        <div className="list">
          <JobList loading={loading} jobs={jobs} onClickListItem={showInfoWindow}></JobList>
        </div>
      </div>
      <div className="right">
        <Paper>
          <Author></Author>
        </Paper>
      </div>
    </Wrapper>
  );
}
