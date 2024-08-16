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
    accessToken:'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktRMnRBY3JFN2xCYVZWR0JtYzVGb2JnZEpvNCIsImtpZCI6IktRMnRBY3JFN2xCYVZWR0JtYzVGb2JnZEpvNCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMmVjMTE0MTktODQ3Yy00ZTI5LTg4MTUtN2Y1YjJmZWQ5MzM5LyIsImlhdCI6MTcyMzU0Njg4MywibmJmIjoxNzIzNTQ2ODgzLCJleHAiOjE3MjM1NTExNDgsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WEFBQUEwUlJqUFJPejBwckRpc3pOWGt2cThEUUZ2bVdkRWhvemJFVUlKMHlBcHlERlc5amFUOTBvWFJoVjdaVFZ5ZHVlIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiS2FybWFkaSIsImdpdmVuX25hbWUiOiJBZGhhbSIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjE5Ny4yNTMuMTk1LjE5OSIsIm5hbWUiOiJBZGhhbSBLYXJtYWRpIiwib2lkIjoiZjYzMmE0ZDUtOGRhMy00M2EzLWJhYjctZTljYWIzOTkyODI0IiwicHVpZCI6IjEwMDMyMDAzQTM1NjJCQ0MiLCJyaCI6IjAuQVNFQUdSVEJMbnlFS1U2SUZYOWJMLTJUT1FrQUFBQUFBQUFBd0FBQUFBQUFBQUFoQU8wLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInNpZ25pbl9zdGF0ZSI6WyJrbXNpIl0sInN1YiI6Il80cGlfd0FwbURobTdSV1pHdDhfZHlELUtncUpHUWcxSXIwYWFIZWVqd0UiLCJ0aWQiOiIyZWMxMTQxOS04NDdjLTRlMjktODgxNS03ZjViMmZlZDkzMzkiLCJ1bmlxdWVfbmFtZSI6ImFkaGFtLmthcm1hZGktZXR1QGV0dS51bml2aDJjLm1hIiwidXBuIjoiYWRoYW0ua2FybWFkaS1ldHVAZXR1LnVuaXZoMmMubWEiLCJ1dGkiOiJ5QV83emxaWVJVZTBBZWk4VU5JTEFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiMSAxNiJ9.IP6dp8TOson0WelPTzM_9mZLn-Tvm5TdDdIx_KtlguIMml_wO5enGkmfgvqRNCCb39-UuZ9D6FGxSrd-IeTuv44TXfWyJlOV-0pHsDXzy7qn0Xi0ayuT58KcFAndXKat9TYclndJobge9ThcEsB-2ubKdfmTHwIcOZhevFpxIccVE4RcFdQNYOzYquQnVlGS9GANHLdkOt5to3MGuZlARQeFXJPBocFrlt_np63o3E3bvOKRdh9ObDyHOeBUaW4UgkmSQONgafFrKr9Or60R6aBvmqdWOewtgGJ1aNLoBOcebWO3hjf29t6dcyotKUCNNkQcw9GNSiKH-vUoOTd5tg',
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
