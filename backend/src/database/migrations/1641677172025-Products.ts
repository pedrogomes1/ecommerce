import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Products1641677172025 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "price",
                        type: "decimal"
                    },
                    {
                        name: 'category_id',
                        type: 'uuid',
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKCategory',
                        referencedTableName: 'categories',
                        referencedColumnNames: ['id'],
                        columnNames: ['category_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'SET NULL',
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');
    }

}
