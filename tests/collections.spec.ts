import { test, expect } from '../support/fixtures/test.fixture';

/*
Define some tests that you would like to perform. 
Make sure you cover at least the basics to retrieve collections and retrieve details of objects within those collections. 
It might be that you find some unexpected behavior. If you do, please describe it.
*/


test("Get Collection made by Rembrandt van Rijn",{
  tag: ['@GET', '@collections'],
}, async ({ API }) => {
    const res = await API.getRequest('/collection', { involvedMaker: 'Rembrandt van Rijn', ps: 100 });

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toContain('application/json');
    
    expect(res.data.count).toBe(3686)
    expect(res.data.artObjects).toBeTruthy();
  });



test("Get details for ArtObject: De Nachtwacht",{
  tag: ['@GET', '@collection-details'],
}, async ({ API }) => {
    const res = await API.getRequest('/collection', { involvedMaker: 'Rembrandt van Rijn', ps: 100 });

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toContain('application/json');
    
    const artObject = res.data.artObjects.find((obj: any) => obj.title === 'De Nachtwacht');
  
    const detailRes = await API.getRequest(`/collection/${artObject.objectNumber}` , { involvedMaker: 'Rembrandt van Rijn', ps: 100 });

    expect(detailRes.statusCode).toBe(200);
    expect(detailRes.headers['content-type']).toContain('application/json');
    expect(detailRes.data.artObject.titles).toEqual([
            "Officieren en andere schutters van wijk II in Amsterdam, onder leiding van kapitein Frans Banninck Cocq en luitenant Willem van Ruytenburch, bekend als ‘De Nachtwacht’",
            "Het korporaalschap van kapitein Frans Banninck Cocq en luitenant Willem van Ruytenburch, bekend als de 'Nachtwacht'"
        ],)
    
  });
