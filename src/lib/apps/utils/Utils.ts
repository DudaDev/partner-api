import * as crypto from 'crypto';

const Utils = {
  validateWebhook(secret: string, headers: any, body: any): boolean {
    const sig = headers['x-duda-signature'];
    const time = headers['x-duda-signature-timestamp'];
    const bodyStr = JSON.stringify(body);

    const decoded = Buffer.from(secret, 'base64')
      .toString('utf8');

    const check = crypto.createHmac('sha256', decoded)
      .update(`${time}.${bodyStr}`)
      .digest('base64');

    return sig === check;
  },

  validateSSOLink(pubKey: string, params: {
    sdk_url: string;
    timestamp: string;
    secure_sig: string;
    site_name: string;
  }) {
    if (!params?.sdk_url || !params?.timestamp || !params?.secure_sig || !params?.site_name) {
      return false;
    }

    const decodedSignature = decodeURIComponent(params.secure_sig);
    const decodedSdkUrl = decodeURIComponent(params.sdk_url);
    const decodedSiteName = decodeURIComponent(params.site_name);
    const sigDataToVerify = `${decodedSiteName}:${decodedSdkUrl}:${params.timestamp}`;

    return (
      sigDataToVerify === crypto.publicDecrypt(
        `-----BEGIN PUBLIC KEY-----\n${
          pubKey
        }\n-----END PUBLIC KEY-----`,
        Buffer.from(decodedSignature, 'base64'),
      )
        .toString()
    );
  },
};

export default Utils;
export { Utils };
