<?php

namespace App\Repository;

use App\Entity\Chart;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use phpDocumentor\Reflection\Types\Integer;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Chart|null find($id, $lockMode = null, $lockVersion = null)
 * @method Chart|null findOneBy(array $criteria, array $orderBy = null)
 * @method Chart[]    findAll()
 * @method Chart[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ChartRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Chart::class);
    }

    public function chartListTotalCount()
    {

        return $this->createQueryBuilder('c')
            ->select('count(c.id)')
            ->getQuery()
            ->getSingleScalarResult()
        ;
    }

    public function chartList(int $pageSize = 5, int $firstResult = 0)
    {

        return $this->createQueryBuilder('c')
                    ->select('c.id')
                    ->addSelect('c.title')
                    ->addSelect('c.startYear')
                    ->addSelect('c.endYear')
                    ->addSelect('c.type')
                    ->addSelect('DATE_FORMAT(c.createdAt, \'%Y-%m-%d\') as createdAt')
                    ->orderBy('c.createdAt', 'DESC')
                    ->setFirstResult($firstResult)
                    ->setMaxResults($pageSize)
                    ->getQuery()
                    ->getResult()
            ;
    }


    public function chart(int $id)
    {


        return $this->createQueryBuilder('c')
                    ->select('c.id')
                    ->addSelect('c.title')
                    ->addSelect('c.startYear')
                    ->addSelect('c.endYear')
                    ->addSelect('c.type')
                    ->addSelect('DATE_FORMAT(c.createdAt, \'%Y-%m-%d\') as createdAt')
                    ->addSelect('c.dataFile')
                    ->where('c.id = :id')
                    ->setParameter('id', $id)
                    ->getQuery()
                    ->getResult()
            ;
    }


    /*
    public function findOneBySomeField($value): ?Chart
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
