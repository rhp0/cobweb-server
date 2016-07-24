#!/bin/bash
secstr=`date +%s`
datestr=`date --date=@$secstr +%Y%m%d%H%M%S`
logdir="/node_app_slot/public/ftp/datalogs"
summdir="/node_app_slot/public/ftp/summary"
cp /var/volatile/datalog  /var/volatile/tmplog
systemctl stop logMFD1.service
systemctl start logMFD1.service

#eliminate partial records and remove framing brackets
grep ^[[].*[]][[:cntrl:]]*$ /var/volatile/tmplog |tr -d [] > $logdir/$datestr.log

#sta column headings are N	min	Q1	median	Q3	max	mean	sd	  
echo -n -e $secstr '\t' >> $summdir/col1stats.txt
awk 'BEGIN {FS=","} {print $1}' $logdir/$datestr.log | sta -brief -n -q -mean -sd >> $summdir/col1stats.txt
echo -n -e $secstr '\t' >> $summdir/col2stats.txt
awk 'BEGIN {FS=","} {print $2}' $logdir/$datestr.log | sta -brief -n -q -mean -sd >> $summdir/col2stats.txt
echo -n -e $secstr '\t' >> $summdir/col3stats.txt
awk 'BEGIN {FS=","} {print $3}' $logdir/$datestr.log | sta -brief -n -q -mean -sd >> $summdir/col3stats.txt
echo -n -e $secstr '\t' >> $summdir/col4stats.txt
awk 'BEGIN {FS=","} {print $4}' $logdir/$datestr.log | sta -brief -n -q -mean -sd >> $summdir/col4stats.txt
echo -n -e $secstr '\t' >> $summdir/col5stats.txt
awk 'BEGIN {FS=","} {print $5}' $logdir/$datestr.log | sta -brief -n -q -mean -sd >> $summdir/col5stats.txt
echo -n -e $secstr '\t' >> $summdir/col6stats.txt
awk 'BEGIN {FS=","} {print $6}' $logdir/$datestr.log | sta -brief -n -q -mean -sd >> $summdir/col6stats.txt
echo -n -e $secstr '\t' >> $summdir/col7stats.txt
awk 'BEGIN {FS=","} {print $7}' $logdir/$datestr.log | sta -brief -n -q -mean -sd >> $summdir/col7stats.txt
echo -n -e $secstr '\t' >> $summdir/col8stats.txt
awk 'BEGIN {FS=","} {print $8}' $logdir/$datestr.log | sta -brief -n -q -mean -sd >> $summdir/col8stats.txt
echo -n -e $secstr '\t' >> $summdir/col9stats.txt
awk 'BEGIN {FS=","} {print $9}' $logdir/$datestr.log | sta -brief -n -q -mean -sd >> $summdir/col9stats.txt
echo -n -e $secstr '\t' >> $summdir/col10stats.txt
awk 'BEGIN {FS=","} {print $10}' $logdir/$datestr.log | sta -brief -n -q -mean -sd >> $summdir/col10stats.txt
echo -n -e $secstr '\t' >> $summdir/col11stats.txt
awk 'BEGIN {FS=","} {print $11}' $logdir/$datestr.log | sta -brief -n -q -mean -sd >> $summdir/col11stats.txt
echo -n -e $secstr '\t' >> $summdir/col12stats.txt
awk 'BEGIN {FS=","} {print $12}' $logdir/$datestr.log | sta -brief -n -q -mean -sd >> $summdir/col12stats.txt
echo -n -e $secstr '\t' >> $summdir/col13stats.txt
awk 'BEGIN {FS=","} {print $13}' $logdir/$datestr.log | sta -brief -n -q -mean -sd >> $summdir/col13stats.txt
echo -n -e $secstr '\t' >> $summdir/col14stats.txt
awk 'BEGIN {FS=","} {print $14}' $logdir/$datestr.log | sta -brief -n -q -mean -sd >> $summdir/col14stats.txt
echo -n -e $secstr '\t' >> $summdir/col15stats.txt
awk 'BEGIN {FS=","} {print $15}' $logdir/$datestr.log | sta -brief -n -q -mean -sd >> $summdir/col15stats.txt
echo -n -e $secstr '\t' >> $summdir/col16stats.txt
awk 'BEGIN {FS=","} {print $16}' $logdir/$datestr.log | sta -brief -n -q -mean -sd >> $summdir/col16stats.txt
echo -n -e $secstr '\t' >> $summdir/col17stats.txt
awk 'BEGIN {FS=","} {print $17}' $logdir/$datestr.log | sta -brief -n -q -mean -sd >> $summdir/col17stats.txt
echo -n -e $secstr '\t' >> $summdir/col18stats.txt
awk 'BEGIN {FS=","} {print $18}' $logdir/$datestr.log | sta -brief -n -q -mean -sd >> $summdir/col18stats.txt
echo -n -e $secstr '\t' >> $summdir/col19stats.txt
awk 'BEGIN {FS=","} {print $19}' $logdir/$datestr.log | sta -brief -n -q -mean -sd >> $summdir/col19stats.txt

