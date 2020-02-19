import React, { useMemo } from 'react';
import { Map, MapProps } from 'react-amap';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import styled from 'styled-components'
import gql from "graphql-tag";

const Wrapper = styled.div`
  position: relative;
  height: 100%;

  > .map {
    position: absolute;
    top: 0;
    left: 0;
  }
`

// const jobs = gql`
//   {
//     jobs(type: "gxrc", keyword: "小学英语老师") {
//       id,
//       name,
//       company,
//       pay,
//       address,
//     }
//   }
// `;

const postupdated = gql`
  subscription Jobs{
    jobs(type: "gxrc", keyword: "小学英语老师") {
      id,
      name,
      company,
      pay,
      address,
      location,
    }
  }
`;

const center: MapProps['center'] = [108.363911, 22.811535]

export default function () {
  // const { loading, error, data } = useQuery<any>(jobs);
  const { loading, error, data } = useSubscription(postupdated)
  const jobs = data?.jobs ?? []

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error?.message}</p>;

  // tslint:disable:react-hooks-nesting
  // const center: MapProps['center'] = useMemo(() => , [])

  console.log(jobs)
  return (
    <Wrapper>
      <Map
        center={center}
      />
    </Wrapper>
  );
}
