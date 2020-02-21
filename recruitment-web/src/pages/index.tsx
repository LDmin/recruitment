import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Map, MapProps, Markers, Marker, InfoWindow, InfoWindowProps } from 'react-amap';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import styled from 'styled-components'
import gql from "graphql-tag";
import TextField from '@material-ui/core/TextField';

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
  }
`

interface Job {
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

export default function () {
  const [showInfoWindowId, setShowInfoWindowId] = useState('')
  const [keyword, setKeyword] = useState('web前端工程师')
  const { loading, error, data } = useSubscription(subscriptionJobs, { variables: { keyword } })

  const jobs: Job[] = data?.jobs ?? []

  const center: MapProps['center'] = useMemo(() => [108.363911, 22.811535], []);
  const plugins: MapProps['plugins'] = useMemo(() => ['ToolBar'], []);
  const infoWindowOffset: InfoWindowProps['offset'] = useMemo(() => [0, -30], []);

  const showJob = jobs.find(j => j.id === showInfoWindowId)

  const events = useMemo(() => ({
    click: (e: any) => {
      const id = e.target?.B?.extData.id
      setShowInfoWindowId(id)
    }
  }), [])

  const onKeywordChange = useCallback((e) => {
    setKeyword(e.target.value)
  }, [])

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
            />
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
        <TextField
          label="Filled"
          variant="filled"
          value={keyword}
          onChange={onKeywordChange}
        />
      </div>
    </Wrapper>
  );
}
