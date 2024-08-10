import React from 'react'
import {gym_equipment} from "../constant"
import Filter from '../components/reusablesUI/FilterComp/FilterUI'
import Rating from '@mui/material/Rating';


const CommercialGym = () => {
  

  return (
   <>
    <div className="flex items-start p-12 gap-4 ">
        <div className="flex flex-col gap-4">
            <div className="w-full b-blue-100 flex rounded-md  overflow-hidden">
                <input type="search"  className='border-2 h-12 rounded-l-md placeholder:px-2 px-2 outline-none' placeholder='search...' />
                <button type="submit" className='bg-blue-100 p-2'>Search</button>
            </div>
        <Filter/>
        </div>
       <div className="flex flex-col gap-4">
        <div className="h-12 bg-gray-300"></div>
       <div className=" flex flex-col  gap-2 h-[100vh] overflow-y-scroll no-scrollbar ">
           {
            gym_equipment.slice(0,7).map((title , i)=>(
                <div key={i} className=" flex flex-col  items-start justify-normal ">
                    <div className="ml-4 p-4 cursor-pointer flex justify-between px-12 gap-12 items-center w-full">
                   <h1 className='text-2xl font-bold hover:pl-4 duration-300' >{title}</h1>
                   <div className="flex gap-4">
                    <button className=' active:scale-95 bg-slate-800 p-2 rounded-md text-xl font-bold shadow-md text-white'>&lt;</button>
                    <button className=' active:scale-95 bg-slate-800 p-2 rounded-md text-xl font-bold shadow-md text-white'>&gt;</button>
                   </div>
                </div>
                   {
                     <div className=" w-full gap-4 flex p-4">
                       {
                         [...Array(3)].map((item)=>(
                           <>
                            <div key={item} className="hover:border-2 p-2 duration-300 hover:shadow-md flex flex-col gap-4 items-start justify-center h-full w-[20rem]">
                              <div className="image  bg-gray-100">
                                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSExIWFRUWGBgVGRgXFhcYFxYXGRgWGBoZGBcaHighGholHhYYITEhJSsrLi4uFx8zODMsNygtLisBCgoKDg0OGg8QGysmHiUrLSsvNy8tLS01LS0tLSstLystLy0tListKy0tKy0tLSsrNy4uLS0tKy0rLSstLTcrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABQcEBgIDCAH/xABMEAACAQIDBAYFBwgIBAcAAAABAgADEQQSIQUGMUEHIlFhcYETFDKRoSMzQnOxssE1UmJygpLR8CRDU2N0orPCFSWD0gg0k6PD4eL/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQMC/8QAJBEBAQACAQIFBQAAAAAAAAAAAAECEUESMRMhIqHBAzJxgfD/2gAMAwEAAhEDEQA/ALxiIgIiICIiAiIgIifCYH2Jqe3d+KVElKS+lcdhso7yez+dZo20+kjE30rpT7lRSfMteBcsSgW6TMcD1a+YduWl/wBk7F6UseOLg+KU/wAFEC+olHHpUxqkgmk1uYQMD4FWF5m4HpcxGYB6VJge5k+OZvsgXJE1fdzfahiiKZBpVTwViCGPYj8z3Gx7ptEBERAREQEREBERAREQEREBERAREQEREBERATRukbeBqeXC0vbcAtbjZjZV8yCT3Dvm8ym6NU4jb1Zm1FN3IH1SZR934wNe2vX9HWGG1axvXYNlJPMZrG3ZoDz7NInaeCpms2Io4ao3shaSK9RKdlAB4E6lb5ibkkzsFS/pazcTVIJ568Pslhbg4lUwbVAGu9UjTibKgA7hck69p7YFQ11xJNzh3H/RqD8JywlJmzekZaOUXGdH6x10H8856MxONysi63ZrAd3bfsteY2Iw7F2PrNZbk6A6L+qOA08YFDnBUuAx2F7OszL+BkENpj9H96elWwzNf+kvxvy4dlmHfOVLDZB1m9KSSbsqcMvDqgC1xfzgef8AY+21zhSbKf0r2PaDxnoPcLb7YikadU3q0rAn89D7LePI+R5zoNCkSqtSpG/ai6zUdzMfTo4+lSDjNnxGFZeeVGPoyfEqPdAt6IiAiIgIiICIiAiIgIiICIiAiIgIiICIiAlNbE2e1LbFVzVDjEHHtky2amadRksTfUG/HThLllVUKWXalM2Iu20hzsSatydAFzajtYjLc2CiFiuXPyNcf3//AHzc9w948Jh8GaVevTSp6R2CuStwQttQDYEg+6aTR1w9e+p9Kn++RJDBrqV1FiGF7/zeEXUm/eBZ8rYiiEF7P6Xs4aZfxklS29gqnXTFIwPNSSPeJRNbFVGXKRTI7w2kjK2NekSNDfrnQDXhoMunESVZrl6LXa+EPDE0z58Jwq7zYFCFfGYdSOTVVUgEEcC3fPPdPH1WWmwA67tTHDQoKRJPV4fKr7jMipQenUzkqTa/FhbloRYjhE2XXH97Lwbb2zWelUOMwpalnsfWKdxnFj9LXhK/3fqq+20dGDK2LdlZSCrAu5BBGhBB4zUMRimdSpC68jUqEfuk90nuj4W2hhB2VVEpu16WiIhCIiAiIgIiICIiAiIgIiICIiAiIgIiICVVktthGDKflMWpUMCVZrNcrlutxb6VjlBsCSTasqvEUUXbFNxSVXavXU1ALM6ilSIzEcR1iBmIPVNhbWFiuanzeKH96PvPImS9fhix/ej77SIMISH2z7X7P+5ZLyH217Q8PxEDN2Z8zh/r8R9zBydU2r0/Lu7efKQGzPmqH19f7mDmwUx/SKQ8PtMCQ23WJpOCxOiaZif6xOX4zo3C/KOE+uWctrMDTqdwTw+cThOG4f5Rwn1ywPS0REBESB343gGAwdXEaFwMtMH6VRtF8QPaPcpgTpNoDA8J5L2nteviGL161Sqx167EjyXgo7gAJ14PH1aRvSq1KZ7UdkPvUiGnhvXMSq+ibpAr4up6niR6RwhdKoABIWwIqAaX1FmHn2m1IcWaIiIQiIgIiICJrG/G+1DZlNTUBqVX9ikpAZhzYn6Kjt7dJkbo73YbaNMvRYhltnpuLOhPaOBHYwuNDzBECfiIgIiICVZjsbSO2FpBl9KmJOZeD5Ww4YHvXXj2m0tOU9tXCgbd9YBDA1Al+YIpqrC/ZpA0fFe1jB/ef72kPJjGH5TGfWH75kPA+SI217Q8PxEl5D7b9pfA/aIGbs35mj9fW+5hZPU7+sUgNSSoFtdSxA+JkDsz5il/iKv3MP8AwmwYWplxdBuIV6beNnv+EUSm3tl1KWHd2pFR1ATe/Golr2Hb5TB3EP8AzHCfXJ9snt594qdfCVKKUcnzZvddLVaZtYSA3F/KOE+uT7Zzj1a9Wv0t1w9MRETpCUL04bxemxS4RDdMPq3fWYf7VIHi7DlLe313hXAYOriDYsBlpqfp1G0QeF9T3AzyxWrs7M7sWZiWZjxZmJJJ7ySTDTCcvl5yXgT5TrvOwKTZQLseAHEk8AO/gIaLq6BNi5aNbGMNareiT9RNWI8XNv8Apy2JG7t7KGEwtHDL/VU1Unta3Wbza585JQwt3SIiEIiICavv5vnS2bRzNZ6z3FKlfVj+c3Yg5nyGpm0Tz30ybAr0Ma2KqFqlCuQEc6+jIHzJ/NA1K9oJ53gabtTaNbFVnxFd89RzcnkByVRyUchPuyttVcJWSvQfLUQ6HkRzVh9JTzH4gGYVSp2TN2Psdq16jaILgf3jD6I7hcZm5cOJgemthby0cRg6OMZ0prUUE5nFlcaMmY8SGBHlOp99cADY4pL+DH4gShsDQqZQtQ8L2Ueyg7FHZN03u3Vp4SnQq0XL06gsSbWzWzArYcCLm3dAtXZ+28PX0pV6bnsDDN+7xkhPNwpAG6jKRzXQ38pYe7G+NfDVFw2PDgEDK9QEOoPDNf2l7+Isey0DeN69r+qYStiQpY01uAO0kKL9wJBPcDKc2JiWGIQ1L2SsLu30xlzNUPdmLe6XLvLs8YnCV6PKpSdRbtINiPO0pjY1G1dCxLB6yMQdQLrYqL/R4m3fA1/EVVapjGU3UuSNCNM55GRMmNoUFp1sZTRQqqxCqNAAH0AHZIaAkRtr2l8D9okvIjbXFfA/hAy9mfMU/wDEP8adL+EnFP8ASKXin3jILZh+QX/EH/TX+EmXrBK1N2BIUoxA4kBySBfnYQMjE/N1Orbqjs/tE7p27jflHCfXJ9s+bS2jhWpMtGlXV2sA1R0KgBlY9VRqbLaNxz/zDCfX0/vQPTURNX6R95f+H4GpVUj0rfJUh/eMDrbmFALfs98Co+mnej1rF+rU2vSwxKmx0asdHP7PseOeV3BJOpJJOpJ1JPMk8zPl4byac1m2dGWzPWdp4dSLqjGs3hTGZf8APkHnNUpczLd/8P2zbvisUR7IWgp/W67j4U4MrqLoiIhgREQEREBMfaGBp16bUayLUpuMrKwuCP55zIiBS22OhFvTA4bEKaJOqVbh0FibB1Bzi9hqAbcyZFb006eDxT0AlqKZEQi5sAiXvcm13LHTTX339Kd6VtnZMX6Qi61kB8xZT9i/vQNaqLfUe/tE3PdnF+uYGtgW1qUwalHtIBvlHgdPB+6aBgqoo2VzmpsTb85OHvGvw9+1bv0VGI9Ph663o9txmPAgm1spF+Fzb4S2Sbo+7kbMWti1Zvm6I9M5PDq+zc/rWPgDMHfTbXrmJaoNEXqU+RyAk5vEkk91x2SQrtXHpcNQpgti2NQ5AwbIpclBmAIW4bQjkRqDImvuxjQP/K1vJCfsvGOUs3BZHRjtv0+HNFjd6NgL8TTPs+61vDLNHx9D0ONNPklew8AxI+BE7OjmrUobQWm6shYFGVgVYAi4uDqLnIZk76YpBtTKBpnoXPLPY5l8gE17yORlGk7ZP9Jxv6zH/MJBTYN47eu423DM32ia/ASO2jTDOgMkJhYz20gd9GmFpKB/bg/+2f4TNx3tDw/EzE/ql+vX/TqTKx3tDw/EwMaTe5H5Qwn19P7wkJJvcn8oYT6+n94QPTc87dNe8PrOO9AhvTwoNPuNVrGofKyp3FWl670bXXB4SviW/qkLAfnNwRfNio855LqVGZizHMzEsxPEsTck+JJMNMJy4xE5U0zEAc4aO0Cyjv18v5vPSPRHsn1fZlG4s1a9dv8AqapfvyBB5TzlZWqBSDkuAQDrluAbHttPSmxd+sFUVVzGhYABagsoA0sGF1t4kQzzvDa4nVQxKP7Dq3A9VgePDhO2GZERAREQEREBPPe2NuVsc9StUK/J1alFLCw9CtTS/wClYnXuE9CSIrbr4Nr3wtLW5NkC3J4k5bamB58xLDOtFgWZrkeWt78jpJ/ZyNRUKCVcam1r5tL8NL6AeUxt/dj/APDsfTc5npZCadhrlOYWJJ1ZSbHxU842ptSjSp0axr06npxmyU2zVKWlz6VTbJY9Xjx98WbHdtKtUuKgd/SKVyleqwGosuS2UWYnTv7TM/A78Y+l/Wlx+bUUN/m0b4zXau26bZdKnG/sHsPZ3z7Q2/QALNchg6LmWoozi17EgAlcwuL6Zh3SSSTUEtU3wPrZxlYKXGXKqgheraw43tprrzMwds7ao4jFUq1O6qiorZiM7MGdnc20LMXue+81nbhdgtdLtSPyZcXKCp7WQvwzZWBtIf0xlaY4yxtu2KyvicTUU9R7lSdL8PjIaRyYxhwJncMff2lB+Bg6GTOitQzHNmUZBmIJN2BYLZbDU9YHW2l5yp1lbQZr9nGY9Spe/hb4g/h8YTorIPzY+uT/AE6sysYdR4fiZHF9LX+mre5WHM/pTPxLXI8PxMJcdOqTW5X5Qwn19L7wkLJncv8AKGE/xFL74hysnp/2rkwtHDA61qmdu9KQBt++yHylFS4en/ZVdqlDEqjNRSmyMVBIptmzXe3BSLa8Or3iU8CO2G2HZ8mThxZS/wCyPHn8Db9qdAEzsNhXr1aWHojM7stNB2sx4nsGpJPIX7IdO3D4BhSSsPad2VOwrTAzsf2qiAfqv2TddjbCxjYZcaVpGkGIZWbrBVbKTlIswvyvecN6cGlHEDDUzdMLSSgD+cwvUqOf0meoxM3LbNT1fY2EoDQ1gHI7jeqf8zrDC3dab/xs0ai1KQGHNspZHfreIYkcuHDThNt2V0hYvIbilW5Ak5Wvp7VrC2vdNa3PwK19o4Wm6hlDVKjAi4stNrXB4i5HvmT0gYXD0cY9LD0kpqFXMqCylyMxNuA0IFh2Qiyt39+cNiciEmnVewyMDYseSvwOvC9ieybRK13X6OilShiXrgoAlX0Yp5SHsGCls1rA92tpZUBERAREQEREDWOkDdz13DWVQatO7p+lp1kv3gDzVZRtfZyahksw0IIsQRoQQdQe6emZD7Z3YwuKOarSBb89bq3mRx87wPP2DaxyWAAHV+PHtP8AATvx+HOIVEqMWp0FcoumVc7ZmuRrZmy3OvKWvtLoxwrU39EXFWxNMlhZX5XAUXFwLytsJhs9OsGBVkGWopHB1YhkPYAQLwJrdXfJcHhlw2JwlI4MErnp9cOc12dlN1cXI1046DgJq3St6o2Jp1cEtIUamHRh6JAil/TV1YlQBZuqAbi+gndiksED5l/OBAIykjUJpYgAaE8uU13E0butP6IJVdANCxNyBzN7njqTC7QNapZiLcJ8FUTO23gcleovYfwEimWFmdZ+FqgXseII9/H+E5ZrcZGLxndWos1jbSHXiM2vUXlp4/x4Sc2dsmmcM9U1LMBca2/O0twIGXXxkauy7gZKoOnAzEr4CqulrjuJF/IafCEue3aK57jJTdvaiUcXh61S4SnVpuxAzWVWBNgNToOE13Kw5kdx/jPgrN3Hw1hO71psbevA4vShiaTkj2M2V7d9NrN8Jg7V6O9mYi5fB0wx1LUwaTX7SaZFz4zy36wOYmy7E36x+GsKOLqZR9Bz6VPC1S+Ufq2g1pZ+1Og3DsScPi6tLudVqqPDVT7yZObi9GlDZjnEPVNesFIDlQi0wfaKJc2YjQsSdL2tc31zd3f7FVFTF1yuUl0NND1WCZQctM3KtqTcn4cLA3h23T9Qq1qdRTmpHLrrdxlGnEG7cILb2VJvph0FUMtw7j0lQ3Ju1Q5725e1bymNj9s18QlMVnDCmCiWULZdOzw+E4bI2XXx+JWiKoBYMczKTlCqTyOovYec4YvCmkzUiQxpsyEjgSCQSL8rw5S/R5tSjh8c1WuxVRR9GpCs3WZlY3CgkaDjI7H1TisYx/tq1h4O9lHuIkDhsQC+hsWZiOWYLobdugm1bhYT0u0KA4hWNQ/sAsPiBAvdVsABwGk+xEBERAREQEREBERASit59qo+NrtQGVGcFiCeuUy3fjpcoLePeZZvSJts4XCMEPylW9NLcQLdZvIc+0iUdSbTx18uUCXXa5qE03pl2qMoUgEsSQqqAV4G44HTrGct9931wWKwiAktUTO9zcBs1rL2ASc6MdmI1c4qqVWnR0UsQAarDTU6aC58Ss49MNVWx2CZSGUobEEEH5TtEDRt66A9creAP+QTWKtGbhvYP6bU/VX7gmuMsCIelaSNGjdB5j+ffONWlJPZlLMh7iPiP/zA13BvkYXvbgffa95vOxVWpTamR1hqDzmm7TwuUv3G/stfV+3gOMmNg40qyns0MDpx2NNOq1N6YNuB7R5xROGqGxRgTcdQ5WN+WtwRflaSW+WAzKKyjhx8D/CathqoDKTfqkHTiQDf3wJCvs9E4PfU3V14cPpcjx5DhOK7PXiLjwsR7tTL4we/WxdpALiEpqx+jiaa6HucggeNxNM373Rw9PE5sHT+RNFWtSqE/KP6azhmzDIMi3UcgbW4wu603d3HYik9WjRGYVqbUqgK3tTNszjXqMAPwN9JJ4g0kuadV7UhYhj1SS2W5KG3Fr27hfmJEsvWT0NSrVBRS9kKlXt1kBUnOoP0tOPCZey9r5ayMMpsVyrkuCwGVQFtqTfh2mS715JG39H2JxVE1MZRw6YhVXI4Lim+U2clL6G2UX4nsE1/FbRDl2sQ5ubEG9zc/bNip75VS2U1KVMrxDUtdPogHUMe+a1isRmrk1HzBnzMUI6wJuwFvZJ+Ey+ll9W314yfi7+I7ymM+2+yx9s4b1XYWGoWsz5CR3tmqt8TadfQ/gb1q1cj2ECDxc3PuCfGRm+u89LF0qCUUamtLMCrAWGiqoBB1AAM3bosp00wYs6l3ZnZQwLL9EAjiNFB85s4bnERAREQEREBERAREQKl6WcRWXEqpHyToqi4BFrnOASNGvY9vsyuts46mtiosQOFtCbnS/Ecu3nPTWIw6VFyuiup5MAR7jK63/6PMP6jiXwtA+nAWooDOxsjqzKiknUqGAHgBCzuoTEYlqhu5vxIB4C/YOXCcsPWKEFTYg3HZfw4TGi8N01jNtPVqmrUAuVCnILcBa9iZ0JVDcD/ABkcrzla8OLhEgw0kjsE6svd9hH4EyGHpE0bnyPH+fGSGxavyg77j3ggfG0OLjY47xILvrxRTb0lvpqNKdutw8uMwF6p8ZI7zPZQbnXTQLrYg6k6jnwmBihJHLb9mOK9Ao2pAsfCaJj8IablDyNvLl8JP7t47JUF+DaHxmXvNss1KlPIOtUZaQ5C7kBLnlqbXlGpIl9Dx+2Z2Dx1eiQaVRlt36T0Ttzoq2biQSKJoOfp0CKevbksU/yyp94uj3E4XEigGR1qfMOzCn6Y/wBlduqK36JIDcRzACQ3c6VcevybhKuh1ZbFdON1tfzn3cHEYGhixUxTWamMydW4DngzW5gagW530sJrJp+qI5qrlqZimU2uGBIC6d4JPhIumpOpN2Y3J7SYFt9Mm1aWIo4ZaFRHVnZmZLZxlAygnio1vbTgJqGz9iXwtWs12cMES57rmw5mQ1AWRR3sfeQv+w++WNsTChqeBpW+cxAqEdqob/YpgZeL6LK6KRQxavpYLVTKBxJGZc2lz+bNZxu6m0cObthnYD6VE+kHkF649wl9RA13cJMQMGnrOcOSxAf21S/VDX1vzsdQCBpa02KIgIiICIiAiIgIiICIiBoe93RZg8aWqIDhqzXJemBkZjzelwOupIyk9spLfPc7EbNqKlYowcMUdDowUgG4OqkZhp36Ez1TKX6VN0NqVnFa/rVNM2UU1CuisQbejAufZUXBYm3AQ6mVim7TKwIIJYWuuuskaG6O0qtUImBxHWIF2pOii+lyzAADvMkdr7k7QwCGrWw/yZBzMhFRU73y+zbjci3fDSZSsdaiqugPpCdXvy/n7JiM59Kjc8wv321/CY4xq6Eka983nYHRljcXQOJzLQa/yVOsrA1FtqzEa0wdLXBvrwuIZ+fLXds4TOhIAcIwvax4gjTt/wDqQz0SLLlIJ4C2p8BJ/bmzcThSKeLovS+iraZG4nquvVJ58b24idOytqYnCP6TC12Q88tiGA5MjAg8+I5w5R2H2RiVBqerVxTUZi5o1Ai25lytgPObbgq+enTqCxamytrwzIwYX8wDNk2R0vLUQ0No4a6upRnpC4KsCGzUmNwLfmk8eE0vZ2ISnWqUkqCpSucj6jMo4GxAIJXiO0Wgehd3MdUr4dKtVVVnAYZGuCpAIPd4XM5bwbFpYyg+HrLdG5i2ZG5OhINmHEGar0W7VzU3wrHWmc6d9NjqPJvvib3A1rdjc2jhKVSm5GINViXaoi6rrlTLqMoue25J8BGba6LNn17mmjYdu2ibL/6ZuoHgBN1q1VUXYhR2kgD3mQ+M3uwNL2sVSuOStnPuS5gef9q4VaNZ6Cv6QUmNMPa2cAk5gLnS7HmZaW6lC+NwtP8AsMM1TzYBf/klXsBiMa4p5nFSu5XS7FDUJW4txy25TdsPvT6riqzoqsxUU7sSRYHSyixvprr2QLjiUjj97sU9X06YipTawGVQPRWF/wCre4vrx4ywNxN7PXAaVUj0yKGJAsGF7GwueBt+8IG3REQEREBERAREQEREBERAREQEROLuALkgAczwgYmH2Rh6bZ0w9JG45lpore8C8zZWu++1auJxIw2FxBppQUVKj02azVX9hCyEGwUFtL6kaG01DH7f2k7tSOMcFbKcrKo4X0dACdCOJ5yb89O+n09W58r0xVFHQrUVWQizBwCpHeDoRKn3w3O2UCXo46jhan9maivTJ/UvmXy0HZNNxWznqa1671f13ZvvEzguCw6ccvmZXCFxCKGZSyvlNgyZiG71JANvECdFGmb3phrg31Xs8JuOE2dUf5nDVXHalFiv71rD3ybwW5ePcG+FC3GhqVlWx7bLmPkRAhaGJr4crVps1JyujLlJysBddbi/ceBHKZDbaxtQZBi8Sb30D5Sf3dfKbRhejHENb0uKpp2hKbP7mYrb3SawnRlhV1qVK9Q/WZB5ejAYe+BUeKoq5zVWLntd2Y+8mfMLhVc2pU3qHspqzn3KDL4we6GBpG64WkTxzOvpGv25nub995NIgUWAAHYBYQKLwG6WPYg08G6cwzlKeXvszBvcJN4Toxxj61K9GlfU5Q9U+d8o+MtuIFfYXoqoDWria79y5Kanyyk/GdVHotFKr6Shi2XhbMgLDS3tgjj4CWNEDB2Pg6lKmEq1jWYE9cixt2cST4kzOiICIiAiIgIiICIiAiIgIiICa5vtumm0aS02qPTKEspU3XMRbrpwYe4jtmxxApGjsHaGzWZTRFZGOYMillYgWBLKMyNw0YW+2Yu7G7tfEYlFr0cStNyWqOqhMrNdizF1ta5tpra1pfEQNVwnR7gE1NFqh7alSow81vl+EnMFsfD0fmqFKn+pTVT7wJnRAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQP/2Q==" alt="" />
                              </div>
                              <div className="detail h-[20vh] bg-black/90 w-full p-2">
                                 <h1 className='text-xl font-bold text-white hover:underline '>Premium Quality Seated Chest Press-BK-001</h1>
                                 <Rating name="half-rating" defaultValue={4.5} precision={0.5} /> 
                                 <div className="price flex gap-2 p-2">
                                  <p className='line-through text-red-300'>Rs 140,960.00 /-</p>
                                  <p className='text-white'>Rs 90,300.00 /-</p>
                                 </div>
                                 <div className="border text-center text-white text-xl p-2">
                                 <button>Add To Cart</button>
                              </div>  
                              </div>
                            </div>
                           </>
                         ))
                       }
                     </div>
                   }
                </div>
            ))
        }
        
        </div>
       </div>
    </div>
   </>
  )
}

export default CommercialGym
