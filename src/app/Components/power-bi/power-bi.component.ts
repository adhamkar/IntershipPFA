import { Component } from '@angular/core';
import { models } from 'powerbi-client';

@Component({
  selector: 'app-power-bi',
  templateUrl: './power-bi.component.html',
  styleUrl: './power-bi.component.scss'
})
export class PowerBiComponent {
  embedConfig = {
    type: 'report',
    id: "f94dfa0b-5e8c-487f-8a36-b6d5f62a0546",
    embedUrl: "https://app.powerbi.com/reportEmbed?reportId=f94dfa0b-5e8c-487f-8a36-b6d5f62a0546&groupId=853fd067-f168-4e2e-84be-a05b95da0140&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVdFU1QtRVVST1BFLUItUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d",
    accessToken:'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMmVjMTE0MTktODQ3Yy00ZTI5LTg4MTUtN2Y1YjJmZWQ5MzM5LyIsImlhdCI6MTcyMjk4NDcxNSwibmJmIjoxNzIyOTg0NzE1LCJleHAiOjE3MjI5ODg5ODAsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WEFBQUFNNWRqakZhUFNXVzgxWGJxQVB2OXJ4MEFENHV6QTBOTkJSckZFM0FYZDNsMnlkM3RKSFkzaWFPVWJ2TkZzNzduIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiS2FybWFkaSIsImdpdmVuX25hbWUiOiJBZGhhbSIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjE2MC4xNzkuMTczLjE3OSIsIm5hbWUiOiJBZGhhbSBLYXJtYWRpIiwib2lkIjoiZjYzMmE0ZDUtOGRhMy00M2EzLWJhYjctZTljYWIzOTkyODI0IiwicHVpZCI6IjEwMDMyMDAzQTM1NjJCQ0MiLCJyaCI6IjAuQVNFQUdSVEJMbnlFS1U2SUZYOWJMLTJUT1FrQUFBQUFBQUFBd0FBQUFBQUFBQUFoQU8wLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6Il80cGlfd0FwbURobTdSV1pHdDhfZHlELUtncUpHUWcxSXIwYWFIZWVqd0UiLCJ0aWQiOiIyZWMxMTQxOS04NDdjLTRlMjktODgxNS03ZjViMmZlZDkzMzkiLCJ1bmlxdWVfbmFtZSI6ImFkaGFtLmthcm1hZGktZXR1QGV0dS51bml2aDJjLm1hIiwidXBuIjoiYWRoYW0ua2FybWFkaS1ldHVAZXR1LnVuaXZoMmMubWEiLCJ1dGkiOiJ3Q3lwMmJBak9VNk9Ja0FzdHZBRUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiMTQgMSJ9.sDxdMt_Qs-oKFBPXsLNuEzGdx783IwzOLEvFDBz4FFsjzTVtJyK3xyMhvSXaQrh2z8FFn7kXyYDC77CyzwIHtVvkA4EXEMeBZzVCPS3Fptqt3MLevXCN1pOYxQoxpVmddf5JusK5jPUVCuCcog0QqKFv-1QyNGfbeNRbGHRBmO_-xxwS5s8v6iaJj5UBP6Pb8VsIzX1iNY1a8E52bGOK5vUBulpESRrPjAf-CvffiYuXXf-9dRRsZEhFtOSvfCSt2_MjCDFDkC0lhAvFL3IS5Nc2IF_1kUZyM7xwshL_jfqGoBBfpNt01mgIeWcx6UCxWTxKaDSI69fBrkRP4AfrtA',
    tokenType: models.TokenType.Aad,
    settings: {
      panes: {
        filters: {
          expanded: false,
          visible: false
        }
      },
      background: models.BackgroundType.Transparent,
    }
  };

  reportClass = 'reportClass';

  eventHandlers = new Map([
    ['loaded', () => console.log('Report loaded')],
    ['rendered', () => console.log('Report rendered')],
    ['error', (event: any) => console.log(event.detail)]
  ]);
}
