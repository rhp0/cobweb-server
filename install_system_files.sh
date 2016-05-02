#!/bin/bash
cp -r /node_app_slot/cp2root/* /
chmod +x /usr/bin/rotate_datalog.sh
systemctl enable logMFD1   #makes a link in multi-user.target.wants to .service unit
systemctl start logMFD1
systemctl enable rotlog.timer #makes a link in timers.target.wants to .timer unit
systemctl start rotlog.timer

cd /home/root/sta
./configure
make
make install
