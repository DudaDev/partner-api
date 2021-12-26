const database: any = {
  foo: {
    auth: {
      type: 'bearer',
      authorization_code: 'a',
      refresh_token: 'aa',
      expiration_date: 1554254560438,
    },
    api_endpoint: 'https://api-sandbox.duda.co',
    installer_account_uuid: '10',
    account_owner_uuid: '12',
    user_lang: 'en',
    app_plan_uuid: '332653a3-df51-45ce-a873-fbb0b1ccb49f',
    recurrency: 'MONTHLY',
    site_name: 'foo',
    free: true,
    configuration_data: '{object}',
  },
  bar: {
    auth: {
      type: 'bearer',
      authorization_code: 'b',
      refresh_token: 'bb',
      expiration_date: 1554254560438,
    },
    api_endpoint: 'https://api-sandbox.duda.co',
    installer_account_uuid: '10',
    account_owner_uuid: '12',
    user_lang: 'en',
    app_plan_uuid: '332653a3-df51-45ce-a873-fbb0b1ccb49f',
    recurrency: 'MONTHLY',
    site_name: 'bar',
    free: true,
    configuration_data: '{object}',
  },
  baz: {
    auth: {
      type: 'bearer',
      authorization_code: 'c',
      refresh_token: 'cc',
      expiration_date: 1554254560438,
    },
    api_endpoint: 'https://api-sandbox.duda.co',
    installer_account_uuid: '10',
    account_owner_uuid: '12',
    user_lang: 'en',
    app_plan_uuid: '332653a3-df51-45ce-a873-fbb0b1ccb49f',
    recurrency: 'MONTHLY',
    site_name: 'baz',
    free: true,
    configuration_data: '{object}',
  },
};

function getById(id: string) {
  return database[id];
}

function updateById(id: string, changeset: any) {
  if (database[id]) {
    database[id] = { ...database[id], ...changeset };
  } else {
    console.log(`${id} not found in mockDB`);
  }
}

export { getById, updateById };
