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
    accessToken:'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMmVjMTE0MTktODQ3Yy00ZTI5LTg4MTUtN2Y1YjJmZWQ5MzM5LyIsImlhdCI6MTcyMTgzODgyMSwibmJmIjoxNzIxODM4ODIxLCJleHAiOjE3MjE4NDQ1MTksImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WEFBQUFtWGMyN3lvdGhjZjh5L1pVcEtDUHRWVUtJNllISnQrcjVsR21ROC9vaXN2ZWRtLy9sNmpDNDBlZlh5UCs3YU8wIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiS2FybWFkaSIsImdpdmVuX25hbWUiOiJBZGhhbSIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjE5Ni43NC4xOTIuNjEiLCJuYW1lIjoiQWRoYW0gS2FybWFkaSIsIm9pZCI6ImY2MzJhNGQ1LThkYTMtNDNhMy1iYWI3LWU5Y2FiMzk5MjgyNCIsInB1aWQiOiIxMDAzMjAwM0EzNTYyQkNDIiwicmgiOiIwLkFTRUFHUlRCTG55RUtVNklGWDliTC0yVE9Ra0FBQUFBQUFBQXdBQUFBQUFBQUFBaEFPMC4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJfNHBpX3dBcG1EaG03UldaR3Q4X2R5RC1LZ3FKR1FnMUlyMGFhSGVlandFIiwidGlkIjoiMmVjMTE0MTktODQ3Yy00ZTI5LTg4MTUtN2Y1YjJmZWQ5MzM5IiwidW5pcXVlX25hbWUiOiJhZGhhbS5rYXJtYWRpLWV0dUBldHUudW5pdmgyYy5tYSIsInVwbiI6ImFkaGFtLmthcm1hZGktZXR1QGV0dS51bml2aDJjLm1hIiwidXRpIjoiaHlTZFpTZndMa0NTV1dXWHdJS05BQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19pZHJlbCI6IjEgOCJ9.qlfmenrNREfelGCPN4bsjQ3xtF9q7YHQeNqSJ3XzFy7BH5gg45UlcK8iQC5yIMYjcqAcqDFpByfwa3Ig-InGyy3KPfWX6EwM6tgQ8WDfOqbhkGBUVbIKbMfkSfGVNmBiEGSvMa5RY65z1Q2nzz4-mocYob4vVIHEJTsrA0udg6ayWT82FrAs4pNhfctKcmVHbQOPMT4NM9tgjmGachz-CGmmGnPBW1vGtLUceqGclBRBzI_IVW_8zW4Y8v6PP9z6Mt1Lv3Xs3HnmU06X2yHELMrVMtMZyW530laIK8CMK1jjv-4ouDDfZD-G3ATiOsEq5ZyifDldF0rjho6ekaF3kA',
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
