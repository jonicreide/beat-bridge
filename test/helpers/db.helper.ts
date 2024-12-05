import { TestingModule } from '@nestjs/testing';
import { DataSource, EntityTarget } from 'typeorm';

export class DbHelper {
  private dataSource: DataSource;

  public static instance(moduleRef: TestingModule): DbHelper {
    const dbHelper = new DbHelper();
    dbHelper.dataSource = moduleRef.get(DataSource);
    return dbHelper;
  }

  public async trucate(entities: EntityTarget<any>[]): Promise<void> {
    await this.dataSource.manager.query('SET CONSTRAINTS ALL DEFERRED');

    for (let entity of entities) {
      const entityMetadata = this.dataSource.getMetadata(entity);

      await this.dataSource.manager.query(
        `TRUNCATE TABLE ${entityMetadata.tableName} RESTART IDENTITY CASCADE`,
      );
    }
  }

  public async onTestEnds(): Promise<void> {
    await this.dataSource
      .destroy()
      .catch((err) => console.log('error when ending db connection: ', err));
  }
}
